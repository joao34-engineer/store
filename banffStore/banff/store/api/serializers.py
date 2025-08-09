from rest_framework import serializers
from store.models import Category, Product

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
