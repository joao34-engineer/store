#!/usr/bin/env python
import os
import sys
import django

# Add the current directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Configure Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'banff.settings')
django.setup()

from store.models import Product, Category

print('Categories:')
for c in Category.objects.all():
    print(f'  {c.name} (slug: {c.slug})')

print('\nProducts:')
for p in Product.objects.all():
    print(f'  {p.name} (slug: {p.slug}) - ${p.price}')
