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

def add_sample_images():
    """Add sample images to products for the featured products section"""
    print("Adding sample images to products...")
    
    # Sample images from Tailwind UI (public examples)
    sample_images = {
        'Basic Tee': 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
        'Organic Cotton T-Shirt': 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
        'Classic Baseball Cap': 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-featured-product-shot.jpg',
        'Premium Hoodie': 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-04-featured-product-shot.jpg',
    }
    
    # Alternative images if the above don't work
    fallback_images = {
        'Basic Tee': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        'Organic Cotton T-Shirt': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        'Classic Baseball Cap': 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        'Premium Hoodie': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    }
    
    products = Product.objects.all()
    
    for product in products:
        if not product.image:  # Only add image if it doesn't have one
            # Try to get image from sample_images first, then fallback
            image_url = sample_images.get(product.name) or fallback_images.get(product.name)
            
            if image_url:
                print(f"Adding image to '{product.name}': {image_url}")
                product.image = image_url
                product.save()
            else:
                print(f"No image found for '{product.name}'")
    
    print("\nSample images added successfully!")

def set_featured_products():
    """Mark some products as featured"""
    print("\nSetting featured products...")
    
    # Get first 4 products and mark them as featured
    products = Product.objects.all()[:4]
    
    for product in products:
        product.is_featured = True
        product.save()
        print(f"'{product.name}' marked as featured")
    
    print("Featured products set successfully!")

if __name__ == '__main__':
    print("Starting product image setup...")
    add_sample_images()
    set_featured_products()
    print("\nProduct image setup completed!")
