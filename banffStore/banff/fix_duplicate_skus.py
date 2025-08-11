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

def fix_duplicate_product_skus():
    """Fix duplicate SKUs in Product model by generating unique ones"""
    print("Checking for duplicate Product SKUs...")
    
    products = Product.objects.all()
    sku_counts = {}
    
    # Count SKU occurrences
    for p in products:
        if p.sku in sku_counts:
            sku_counts[p.sku].append(p.id)
        else:
            sku_counts[p.sku] = [p.id]
    
    # Find duplicates
    duplicate_skus = {k: v for k, v in sku_counts.items() if len(v) > 1}
    
    if duplicate_skus:
        print(f"Found duplicate Product SKUs: {duplicate_skus}")
        
        for sku, product_ids in duplicate_skus.items():
            # Keep the first product with original SKU, update others
            for i, product_id in enumerate(product_ids[1:], 1):
                product = Product.objects.get(id=product_id)
                new_sku = f"{sku}-{i}"
                
                # Ensure new SKU is unique
                counter = 1
                while Product.objects.filter(sku=new_sku).exists():
                    new_sku = f"{sku}-{i}-{counter}"
                    counter += 1
                
                print(f"Updating Product {product_id}: '{sku}' -> '{new_sku}'")
                product.sku = new_sku
                product.save()
    else:
        print("No duplicate Product SKUs found.")

def fix_duplicate_variant_skus():
    """Fix duplicate SKUs in ProductVariant model by generating unique ones"""
    print("\nChecking for duplicate ProductVariant SKUs...")
    
    variants = ProductVariant.objects.all()
    sku_counts = {}
    
    # Count SKU occurrences
    for v in variants:
        if v.sku in sku_counts:
            sku_counts[v.sku].append(v.id)
        else:
            sku_counts[v.sku] = [v.id]
    
    # Find duplicates
    duplicate_skus = {k: v for k, v in sku_counts.items() if len(v) > 1}
    
    if duplicate_skus:
        print(f"Found duplicate ProductVariant SKUs: {duplicate_skus}")
        
        for sku, variant_ids in duplicate_skus.items():
            # Keep the first variant with original SKU, update others
            for i, variant_id in enumerate(variant_ids[1:], 1):
                variant = ProductVariant.objects.get(id=variant_id)
                new_sku = f"{sku}-{i}"
                
                # Ensure new SKU is unique
                counter = 1
                while ProductVariant.objects.filter(sku=new_sku).exists():
                    new_sku = f"{sku}-{i}-{counter}"
                    counter += 1
                
                print(f"Updating ProductVariant {variant_id}: '{sku}' -> '{new_sku}'")
                variant.sku = new_sku
                variant.save()
    else:
        print("No duplicate ProductVariant SKUs found.")

if __name__ == '__main__':
    print("Starting SKU duplication fix...")
    fix_duplicate_product_skus()
    fix_duplicate_variant_skus()
    print("\nSKU duplication fix completed!")
