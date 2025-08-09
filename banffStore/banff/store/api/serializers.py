from rest_framework import serializers
from store.models import Category, Product, Order, OrderItem

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'description', 'price', 'image_url', 'category']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if getattr(obj, 'image', None):
            url = obj.image.url
            return request.build_absolute_uri(url) if request else url
        return None

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['product', 'price', 'quantity', 'total_price']

    def get_total_price(self, obj):
        return float(obj.price) * obj.quantity

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'email', 'full_name', 'address', 'city', 'postal_code', 'country', 'paid', 'payment_id', 'created_at', 'items', 'total']

    def get_total(self, obj):
        return sum([float(i.price) * i.quantity for i in obj.items.all()])

class OrderCreateSerializer(serializers.Serializer):
    email = serializers.EmailField()
    full_name = serializers.CharField(max_length=150)
    address = serializers.CharField(max_length=255)
    city = serializers.CharField(max_length=100)
    postal_code = serializers.CharField(max_length=20)
    country = serializers.CharField(max_length=100, required=False, allow_blank=True)
