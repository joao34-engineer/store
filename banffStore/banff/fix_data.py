#!/usr/bin/env python3
"""
Script to prepare existing data for new model structure
"""
import os
import sys
import django

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'banff.settings')
django.setup()

from django.db import transaction
from store.models import Product
import uuid

def fix_existing_data():
    """Fix existing data to work with new model structure"""
    print("Starting data migration...")
    
    with transaction.atomic():
        # Fix products without SKUs
        products_without_sku = Product.objects.filter(sku__isnull=True) | Product.objects.filter(sku='')
        for product in products_without_sku:
            product.sku = f"SKU-{uuid.uuid4().hex[:8].upper()}"
            print(f"Assigned SKU {product.sku} to product: {product.name}")
            product.save()
        
        print(f"Fixed {products_without_sku.count()} products without SKUs")
        
        # Update any other fields that might cause issues
        Product.objects.filter(status__isnull=True).update(status='active')
        Product.objects.filter(is_featured__isnull=True).update(is_featured=False)
        Product.objects.filter(low_stock_threshold__isnull=True).update(low_stock_threshold=5)
        
        print("Data migration completed successfully!")

if __name__ == '__main__':
    fix_existing_data()
