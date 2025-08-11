#!/usr/bin/env python3

import os
import sys
import django
from pathlib import Path

# Add the project directory to Python path
sys.path.append(str(Path(__file__).resolve().parent))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'banff.settings')
django.setup()

from store.models import Product

def set_external_image_urls():
    """Set external image URLs for products that can be directly used"""
    print("Setting external image URLs for products...")
    
    # High-quality product images from Unsplash
    image_urls = {
        'Basic Tee': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        'Organic Cotton T-Shirt': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        'Classic Baseball Cap': 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        'Premium Hoodie': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    }
    
    # Clear the existing problematic image fields and use description for URLs temporarily
    products = Product.objects.all()
    
    for product in products:
        # Clear the image field
        product.image = None
        
        # Store the image URL in the short_description temporarily
        # (we'll modify the serializer to use this)
        image_url = image_urls.get(product.name)
        if image_url:
            print(f"Setting image URL for '{product.name}': {image_url}")
            # Store URL in short_description for now
            product.short_description = f"IMAGE_URL:{image_url}"
        
        product.save()
    
    print("\nExternal image URLs set successfully!")

if __name__ == '__main__':
    print("Starting external image URL setup...")
    set_external_image_urls()
    print("\nExternal image URL setup completed!")
