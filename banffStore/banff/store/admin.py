from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe
from .models import (
    Category, Brand, Product, ProductImage, ProductAttribute, ProductAttributeValue,
    ProductVariant, ProductReview, Wishlist, Cart, CartItem, Order, OrderItem,
    Coupon, UserProfile
)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'parent', 'is_active', 'sort_order', 'created_at']
    list_filter = ['is_active', 'parent', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['is_active', 'sort_order']
    ordering = ['sort_order', 'name']

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ['name', 'is_active', 'website', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['is_active']

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ['image', 'alt_text', 'sort_order', 'is_primary']

class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 0
    fields = ['sku', 'price', 'stock', 'image']

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'brand', 'price', 'stock', 'status', 'is_featured', 'created_at']
    list_filter = ['status', 'is_featured', 'category', 'brand', 'created_at']
    search_fields = ['name', 'description', 'sku']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['price', 'stock', 'status', 'is_featured']
    inlines = [ProductImageInline, ProductVariantInline]
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'sku', 'status', 'is_featured')
        }),
        ('Product Details', {
            'fields': ('description', 'short_description', 'category', 'brand')
        }),
        ('Pricing', {
            'fields': ('price', 'compare_at_price', 'cost_price')
        }),
        ('Inventory', {
            'fields': ('stock', 'low_stock_threshold', 'track_inventory', 'allow_backorders')
        }),
        ('Media', {
            'fields': ('image',)
        }),
        ('Physical Properties', {
            'fields': ('weight', 'dimensions')
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description'),
            'classes': ('collapse',)
        }),
        ('Other', {
            'fields': ('tax_class',),
            'classes': ('collapse',)
        })
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('category', 'brand')

@admin.register(ProductAttribute)
class ProductAttributeAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(ProductAttributeValue)
class ProductAttributeValueAdmin(admin.ModelAdmin):
    list_display = ['attribute', 'value', 'slug']
    list_filter = ['attribute']
    search_fields = ['value']

@admin.register(ProductReview)
class ProductReviewAdmin(admin.ModelAdmin):
    list_display = ['product', 'user', 'rating', 'title', 'is_approved', 'is_verified_purchase', 'created_at']
    list_filter = ['rating', 'is_approved', 'is_verified_purchase', 'created_at']
    search_fields = ['product__name', 'user__username', 'title', 'comment']
    list_editable = ['is_approved']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    list_display = ['user', 'product_count', 'created_at']
    search_fields = ['user__username']
    filter_horizontal = ['products']
    
    def product_count(self, obj):
        return obj.products.count()
    product_count.short_description = 'Product Count'

class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    fields = ['product', 'variant', 'quantity', 'unit_price_display', 'total_price_display']
    readonly_fields = ['unit_price_display', 'total_price_display']
    
    def unit_price_display(self, obj):
        return f"R$ {obj.unit_price:.2f}"
    unit_price_display.short_description = 'Unit Price'
    
    def total_price_display(self, obj):
        return f"R$ {obj.total_price:.2f}"
    total_price_display.short_description = 'Total Price'

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['cart_display', 'total_items', 'total_amount_display', 'created_at']
    list_filter = ['created_at']
    search_fields = ['user__username', 'session_key']
    inlines = [CartItemInline]
    readonly_fields = ['total_amount_display', 'total_items']
    
    def cart_display(self, obj):
        if obj.user:
            return f"Cart for {obj.user.username}"
        return f"Cart for session {obj.session_key[:10]}..."
    cart_display.short_description = 'Cart'
    
    def total_amount_display(self, obj):
        return f"R$ {obj.total_amount:.2f}"
    total_amount_display.short_description = 'Total Amount'

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    fields = ['product', 'variant', 'quantity', 'unit_price', 'total_price']
    readonly_fields = ['total_price']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_number', 'user', 'status', 'payment_status', 'total_amount', 'created_at']
    list_filter = ['status', 'payment_status', 'created_at']
    search_fields = ['order_number', 'user__username', 'billing_email']
    list_editable = ['status', 'payment_status']
    inlines = [OrderItemInline]
    readonly_fields = ['order_number', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Order Information', {
            'fields': ('order_number', 'user', 'status', 'payment_status', 'notes')
        }),
        ('Amounts', {
            'fields': ('subtotal', 'tax_amount', 'shipping_amount', 'discount_amount', 'total_amount')
        }),
        ('Billing Address', {
            'fields': (
                'billing_first_name', 'billing_last_name', 'billing_email', 'billing_phone',
                'billing_address_line1', 'billing_address_line2', 'billing_city',
                'billing_state', 'billing_zip_code', 'billing_country'
            ),
            'classes': ('collapse',)
        }),
        ('Shipping Address', {
            'fields': (
                'shipping_first_name', 'shipping_last_name',
                'shipping_address_line1', 'shipping_address_line2', 'shipping_city',
                'shipping_state', 'shipping_zip_code', 'shipping_country'
            ),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )

@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ['code', 'discount_type', 'discount_value', 'is_active', 'usage_status', 'valid_from', 'valid_until']
    list_filter = ['discount_type', 'is_active', 'valid_from', 'valid_until']
    search_fields = ['code', 'description']
    list_editable = ['is_active']
    readonly_fields = ['used_count']
    
    def usage_status(self, obj):
        if obj.usage_limit:
            return f"{obj.used_count}/{obj.usage_limit}"
        return f"{obj.used_count}/∞"
    usage_status.short_description = 'Usage'

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'phone', 'newsletter_subscribed', 'created_at']
    list_filter = ['newsletter_subscribed', 'created_at']
    search_fields = ['user__username', 'user__email', 'phone']
    list_editable = ['newsletter_subscribed']
    
    fieldsets = (
        ('User Information', {
            'fields': ('user', 'phone', 'birth_date', 'avatar', 'newsletter_subscribed')
        }),
        ('Default Address', {
            'fields': (
                'default_address_line1', 'default_address_line2', 'default_city',
                'default_state', 'default_zip_code', 'default_country'
            ),
            'classes': ('collapse',)
        })
    )

# Customize admin site
admin.site.site_header = "Banff Store Administration"
admin.site.site_title = "Banff Store Admin"
admin.site.index_title = "Welcome to Banff Store Administration"
