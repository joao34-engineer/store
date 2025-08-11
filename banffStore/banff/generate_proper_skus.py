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

from store.models import Product, ProductVariant

def generate_proper_skus():
    """Generate proper SKUs for products that have empty or placeholder SKUs"""
    print("Generating proper SKUs for products...")
    
    products = Product.objects.all()
    
    for product in products:
        # If SKU is empty or starts with '-' (our placeholder), generate a proper one
        if not product.sku or product.sku.startswith('-'):
            # Generate SKU from product name and ID
            name_part = ''.join([c.upper() for c in product.name if c.isalnum()])[:6]
            new_sku = f"{name_part}-{product.id:03d}"
            
            # Ensure uniqueness
            counter = 1
            original_sku = new_sku
            while Product.objects.filter(sku=new_sku).exclude(id=product.id).exists():
                new_sku = f"{original_sku}-{counter}"
                counter += 1
            
            print(f"Updating Product '{product.name}': '{product.sku}' -> '{new_sku}'")
            product.sku = new_sku
            product.save()
    
    print("\nSKU generation completed!")

if __name__ == '__main__':
    generate_proper_skus()
