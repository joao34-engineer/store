from django.urls import path
from .api import views

app_name = 'store_api'

urlpatterns = [
    # Products
    path('products/', views.ProductListView.as_view(), name='product_list'),
    path('products/<slug:slug>/', views.ProductDetailView.as_view(), name='product_detail'),
    
    # Categories  
    path('categories/', views.CategoryListView.as_view(), name='category_list'),
    
    # Cart
    path('cart/', views.cart_view, name='cart'),
    path('cart/items/<int:item_id>/', views.cart_item_view, name='cart_item'),
]