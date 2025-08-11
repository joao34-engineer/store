from django.urls import path
from .api import views

app_name = 'store_api'

urlpatterns = [
    # Authentication
    path('auth/register/', views.register_view, name='register'),
    path('auth/login/', views.login_view, name='login'),
    path('auth/logout/', views.logout_view, name='logout'),
    
    # Products
    path('products/', views.ProductListView.as_view(), name='product_list'),
    path('products/<slug:slug>/', views.ProductDetailView.as_view(), name='product_detail'),
    path('search/', views.search_view, name='search'),
    
    # Categories and Brands
    path('categories/', views.CategoryListView.as_view(), name='category_list'),
    path('brands/', views.BrandListView.as_view(), name='brand_list'),
    
    # Cart
    path('cart/', views.cart_view, name='cart'),
    path('cart/items/<int:item_id>/', views.cart_item_view, name='cart_item'),
    
    # Wishlist
    path('wishlist/', views.wishlist_view, name='wishlist'),
    
    # Reviews
    path('reviews/', views.reviews_view, name='reviews'),
    
    # Orders
    path('orders/', views.orders_view, name='orders'),
    path('orders/<str:order_number>/', views.order_detail_view, name='order_detail'),
    
    # Coupons
    path('coupons/validate/', views.validate_coupon_view, name='validate_coupon'),
    
    # User Profile
    path('profile/', views.user_profile_view, name='user_profile'),
]