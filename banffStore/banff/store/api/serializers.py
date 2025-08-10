from rest_framework import serializers
from ..models import Product, Category, Cart, CartItem


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Category model with basic fields"""
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'created_at']
        read_only_fields = ['id', 'created_at']


class ProductListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for product listings"""
    category = CategorySerializer(read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'price', 'image', 
            'available', 'category', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class ProductDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for individual product views"""
    category = CategorySerializer(read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'price', 
            'image', 'stock', 'available', 'category', 
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class CartItemSerializer(serializers.ModelSerializer):
    """Serializer for cart items with product details"""
    product = ProductListSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    total_price = serializers.SerializerMethodField()
    
    class Meta:
        model = CartItem
        fields = [
            'id', 'product', 'product_id', 'quantity', 
            'total_price', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
    
    def get_total_price(self, obj):
        """Calculate total price for this cart item"""
        return obj.quantity * obj.product.price
    
    def validate_quantity(self, value):
        """Ensure quantity is positive"""
        if value <= 0:
            raise serializers.ValidationError("Quantity must be greater than 0")
        return value
    
    def validate_product_id(self, value):
        """Ensure product exists and is available"""
        try:
            product = Product.objects.get(id=value)
            if not product.available:
                raise serializers.ValidationError("Product is not available")
            return value
        except Product.DoesNotExist:
            raise serializers.ValidationError("Product does not exist")


class CartSerializer(serializers.ModelSerializer):
    """Serializer for shopping cart with items"""
    items = CartItemSerializer(many=True, read_only=True)
    total_items = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()
    
    class Meta:
        model = Cart
        fields = [
            'id', 'session_key', 'items', 'total_items', 
            'total_price', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_total_items(self, obj):
        """Calculate total number of items in cart"""
        return sum(item.quantity for item in obj.items.all())
    
    def get_total_price(self, obj):
        """Calculate total price of all items in cart"""
        return sum(item.quantity * item.product.price for item in obj.items.all())