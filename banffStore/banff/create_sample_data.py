#!/usr/bin/env python
import os
import sys
import django

# Add the current directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Configure Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'banff.settings')
django.setup()

from store.models import Category, Product

def create_sample_data():
    try:
        # Create clothing category
        clothing, created = Category.objects.get_or_create(
            name='Clothing',
            defaults={
                'description': 'Fashionable clothing items'
            }
        )
        print(f'Clothing category: {"created" if created else "already exists"}')

        # Create accessories category  
        accessories, created = Category.objects.get_or_create(
            name='Accessories',
            defaults={
                'description': 'Stylish accessories'
            }
        )
        print(f'Accessories category: {"created" if created else "already exists"}')

        # Create sample products
        products_data = [
            {
                'name': 'Basic Tee',
                'description': 'The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee its own look.',
                'price': 35.00,
                'category': clothing,
                'stock': 50,
                'available': True
            },
            {
                'name': 'Organic Cotton T-Shirt',
                'description': 'Made from 100% organic cotton, this sustainable t-shirt is perfect for everyday wear. Soft, comfortable, and environmentally friendly.',
                'price': 28.00,
                'category': clothing,
                'stock': 30,
                'available': True
            },
            {
                'name': 'Classic Baseball Cap',
                'description': 'A timeless baseball cap made from high-quality materials. Perfect for outdoor activities or casual wear.',
                'price': 25.00,
                'category': accessories,
                'stock': 20,
                'available': True
            },
            {
                'name': 'Premium Hoodie',
                'description': 'Ultra-soft premium hoodie with a perfect fit. Made from a blend of cotton and polyester for maximum comfort.',
                'price': 65.00,
                'category': clothing,
                'stock': 15,
                'available': True
            }
        ]

        for product_data in products_data:
            product, created = Product.objects.get_or_create(
                name=product_data['name'],
                defaults=product_data
            )
            print(f'{product_data["name"]}: {"created" if created else "already exists"}')

        print(f'\nTotal products: {Product.objects.count()}')
        print(f'Total categories: {Category.objects.count()}')
        print('Sample data creation completed!')
        
    except Exception as e:
        print(f'Error creating sample data: {e}')
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    create_sample_data()
