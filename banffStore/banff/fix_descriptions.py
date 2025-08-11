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

def add_proper_descriptions():
    """Add proper short descriptions to products"""
    print("Adding proper short descriptions to products...")
    
    descriptions = {
        'Basic Tee': 'Comfortable everyday tee made from soft cotton blend. Perfect for casual wear.',
        'Organic Cotton T-Shirt': 'Eco-friendly organic cotton t-shirt. Sustainable fashion at its best.',
        'Classic Baseball Cap': 'Timeless baseball cap with adjustable strap. Perfect for any outdoor activity.',
        'Premium Hoodie': 'Cozy premium hoodie with soft interior lining. Ideal for cooler weather.',
    }
    
    # Temporarily store image URLs
    image_urls = {}
    products = Product.objects.all()
    
    for product in products:
        if product.short_description and product.short_description.startswith('IMAGE_URL:'):
            # Extract the image URL
            image_url = product.short_description.replace('IMAGE_URL:', '')
            image_urls[product.name] = image_url
            
            # Set proper description
            description = descriptions.get(product.name, 'High-quality product with excellent craftsmanship.')
            product.short_description = description
            
            print(f"Updated description for '{product.name}': {description}")
            product.save()
    
    print("\nProper descriptions added successfully!")
    
    # Show the image URLs that are being used
    print("\nImage URLs being used:")
    for name, url in image_urls.items():
        print(f"  {name}: {url}")

if __name__ == '__main__':
    print("Starting product description update...")
    add_proper_descriptions()
    print("\nProduct description update completed!")
