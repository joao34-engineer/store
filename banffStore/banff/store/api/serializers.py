from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import (
    Category, Brand, Product, ProductImage, ProductAttribute, ProductAttributeValue,
    ProductVariant, ProductReview, Wishlist, Cart, CartItem, Order, OrderItem,
    Coupon, UserProfile
)

class CategorySerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = [
            'id', 'name', 'slug', 'description', 'parent', 'is_active',
            'sort_order', 'children', 'created_at'
        ]
    
    def get_children(self, obj):
        if hasattr(obj, 'children') and obj.children.filter(is_active=True).exists():
            return CategorySerializer(obj.children.filter(is_active=True), many=True).data
        return []

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name', 'slug', 'description', 'logo', 'website']

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'sort_order', 'is_primary']

class ProductAttributeValueSerializer(serializers.ModelSerializer):
    attribute_name = serializers.CharField(source='attribute.name', read_only=True)
    
    class Meta:
        model = ProductAttributeValue
        fields = ['id', 'attribute_name', 'value', 'slug']

class ProductVariantSerializer(serializers.ModelSerializer):
    attributes = ProductAttributeValueSerializer(many=True, read_only=True)
    price_display = serializers.SerializerMethodField()
    
    class Meta:
        model = ProductVariant
        fields = ['id', 'sku', 'price', 'price_display', 'stock', 'image', 'attributes']
    
    def get_price_display(self, obj):
        if obj.price:
            return f"R$ {obj.price:.2f}"
        return None

class ProductReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    user_avatar = serializers.SerializerMethodField()
    
    class Meta:
        model = ProductReview
        fields = [
            'id', 'user_name', 'user_avatar', 'rating', 'title', 'comment',
            'is_verified_purchase', 'helpful_votes', 'created_at'
        ]
    
    def get_user_avatar(self, obj):
        try:
            if hasattr(obj.user, 'profile') and obj.user.profile.avatar:
                return obj.user.profile.avatar.url
        except:
            pass
        return None

class ProductListSerializer(serializers.ModelSerializer):
    """Simplified serializer for product listings"""
    category = CategorySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)
    price_display = serializers.SerializerMethodField()
    compare_at_price_display = serializers.SerializerMethodField()
    discount_percentage = serializers.ReadOnlyField()
    is_on_sale = serializers.ReadOnlyField()
    average_rating = serializers.ReadOnlyField()
    review_count = serializers.ReadOnlyField()
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'short_description', 'price', 'price_display',
            'compare_at_price', 'compare_at_price_display', 'discount_percentage',
            'is_on_sale', 'category', 'brand', 'image', 'stock', 'is_featured',
            'average_rating', 'review_count', 'created_at'
        ]
    
    def get_price_display(self, obj):
        return f"R$ {obj.price:.2f}"
    
    def get_compare_at_price_display(self, obj):
        if obj.compare_at_price:
            return f"R$ {obj.compare_at_price:.2f}"
        return None
    
    def get_image(self, obj):
        # Define static image URLs for products
        image_urls = {
            'Basic Tee': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            'Organic Cotton T-Shirt': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            'Classic Baseball Cap': 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            'Premium Hoodie': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        }
        
        # Return static image URL for known products
        if obj.name in image_urls:
            return image_urls[obj.name]
        
        # Fallback to actual image field if it exists
        if obj.image:
            return obj.image.url
            
        return None

class ProductDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for individual product views"""
    category = CategorySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    reviews = serializers.SerializerMethodField()
    price_display = serializers.SerializerMethodField()
    compare_at_price_display = serializers.SerializerMethodField()
    discount_percentage = serializers.ReadOnlyField()
    is_on_sale = serializers.ReadOnlyField()
    is_low_stock = serializers.ReadOnlyField()
    average_rating = serializers.ReadOnlyField()
    review_count = serializers.ReadOnlyField()
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'short_description', 'sku',
            'price', 'price_display', 'compare_at_price', 'compare_at_price_display',
            'discount_percentage', 'is_on_sale', 'category', 'brand', 'image',
            'images', 'stock', 'is_low_stock', 'low_stock_threshold', 'weight',
            'dimensions', 'status', 'is_featured', 'variants', 'reviews',
            'average_rating', 'review_count', 'meta_title', 'meta_description',
            'created_at', 'updated_at'
        ]
    
    def get_price_display(self, obj):
        return f"R$ {obj.price:.2f}"
    
    def get_compare_at_price_display(self, obj):
        if obj.compare_at_price:
            return f"R$ {obj.compare_at_price:.2f}"
        return None
    
    def get_image(self, obj):
        # Define static image URLs for products
        image_urls = {
            'Basic Tee': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            'Organic Cotton T-Shirt': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            'Classic Baseball Cap': 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            'Premium Hoodie': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        }
        
        # Return static image URL for known products
        if obj.name in image_urls:
            return image_urls[obj.name]
        
        # Fallback to actual image field if it exists
        if obj.image:
            return obj.image.url
            
        return None
    
    def get_reviews(self, obj):
        if hasattr(obj, 'reviews'):
            reviews = obj.reviews.filter(is_approved=True)[:5]  # Latest 5 reviews
            return ProductReviewSerializer(reviews, many=True).data
        return []

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = UserProfile
        fields = [
            'user', 'phone', 'birth_date', 'avatar', 'newsletter_subscribed',
            'default_address_line1', 'default_address_line2', 'default_city',
            'default_state', 'default_zip_code', 'default_country'
        ]

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    variant = ProductVariantSerializer(read_only=True)
    variant_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    unit_price = serializers.ReadOnlyField()
    total_price = serializers.ReadOnlyField()
    unit_price_display = serializers.SerializerMethodField()
    total_price_display = serializers.SerializerMethodField()
    
    class Meta:
        model = CartItem
        fields = [
            'id', 'product', 'product_id', 'variant', 'variant_id', 'quantity', 
            'unit_price', 'unit_price_display', 'total_price', 'total_price_display'
        ]
    
    def get_unit_price_display(self, obj):
        return f"R$ {obj.unit_price:.2f}"
    
    def get_total_price_display(self, obj):
        return f"R$ {obj.total_price:.2f}"
    
    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError("Quantity must be greater than 0")
        return value

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_amount = serializers.ReadOnlyField()
    total_items = serializers.ReadOnlyField()
    total_amount_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Cart
        fields = [
            'id', 'items', 'total_amount', 'total_amount_display',
            'total_items', 'created_at', 'updated_at'
        ]
    
    def get_total_amount_display(self, obj):
        return f"R$ {obj.total_amount:.2f}"

class WishlistSerializer(serializers.ModelSerializer):
    products = ProductListSerializer(many=True, read_only=True)
    product_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Wishlist
        fields = ['id', 'products', 'product_count', 'created_at', 'updated_at']
    
    def get_product_count(self, obj):
        return obj.products.count()

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    variant = ProductVariantSerializer(read_only=True)
    unit_price_display = serializers.SerializerMethodField()
    total_price_display = serializers.SerializerMethodField()
    
    class Meta:
        model = OrderItem
        fields = [
            'id', 'product', 'variant', 'quantity', 'unit_price',
            'unit_price_display', 'total_price', 'total_price_display'
        ]
    
    def get_unit_price_display(self, obj):
        return f"R$ {obj.unit_price:.2f}"
    
    def get_total_price_display(self, obj):
        return f"R$ {obj.total_price:.2f}"

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    payment_status_display = serializers.CharField(source='get_payment_status_display', read_only=True)
    subtotal_display = serializers.SerializerMethodField()
    total_amount_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'user', 'status', 'status_display',
            'payment_status', 'payment_status_display', 'items',
            'subtotal', 'subtotal_display', 'tax_amount', 'shipping_amount',
            'discount_amount', 'total_amount', 'total_amount_display',
            'billing_first_name', 'billing_last_name', 'billing_email',
            'shipping_first_name', 'shipping_last_name', 'notes',
            'created_at', 'updated_at'
        ]
    
    def get_subtotal_display(self, obj):
        return f"R$ {obj.subtotal:.2f}"
    
    def get_total_amount_display(self, obj):
        return f"R$ {obj.total_amount:.2f}"

class CouponSerializer(serializers.ModelSerializer):
    discount_type_display = serializers.CharField(source='get_discount_type_display', read_only=True)
    is_valid = serializers.ReadOnlyField()
    
    class Meta:
        model = Coupon
        fields = [
            'id', 'code', 'description', 'discount_type', 'discount_type_display',
            'discount_value', 'minimum_amount', 'is_valid', 'valid_from', 'valid_until'
        ]

# Create/Update Serializers
class CartItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['product', 'variant', 'quantity']

class ProductReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = ['product', 'rating', 'title', 'comment']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
