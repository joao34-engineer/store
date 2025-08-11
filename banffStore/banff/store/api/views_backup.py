from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404
from django.db.models import Q

from ..models import Product, Category, Cart, CartItem
from .serializers import (
    ProductListSerializer, 
    ProductDetailSerializer, 
    CategorySerializer,
    CartSerializer,
    CartItemSerializer
)


class StandardResultsSetPagination(PageNumberPagination):
    """Custom pagination for API responses"""
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class ProductListView(generics.ListAPIView):
    """
    List all products with filtering and search capabilities
    """
    serializer_class = ProductListSerializer
    pagination_class = StandardResultsSetPagination
    
    def get_queryset(self):
        queryset = Product.objects.filter(available=True).select_related('category')
        
        # Search functionality
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | 
                Q(description__icontains=search) |
                Q(category__name__icontains=search)
            )
        
        # Category filtering
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category__slug=category)
        
        # Price filtering
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        # Ordering
        ordering = self.request.query_params.get('ordering', '-created_at')
        queryset = queryset.order_by(ordering)
        
        return queryset


class ProductDetailView(generics.RetrieveAPIView):
    """
    Retrieve a single product by ID or slug
    """
    serializer_class = ProductDetailSerializer
    lookup_field = 'slug'
    
    def get_queryset(self):
        return Product.objects.filter(available=True).select_related('category')
    
    def get_object(self):
        """Allow lookup by either slug or ID"""
        lookup_value = self.kwargs.get(self.lookup_field)
        
        if lookup_value.isdigit():
            # If it's a number, search by ID
            return get_object_or_404(self.get_queryset(), id=lookup_value)
        else:
            # Otherwise, search by slug
            return get_object_or_404(self.get_queryset(), slug=lookup_value)


class CategoryListView(generics.ListAPIView):
    """
    List all categories
    """
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer


@api_view(['GET', 'POST'])
def cart_view(request):
    """
    Handle cart operations - get cart or add items
    """
    session_key = request.session.session_key
    if not session_key:
        request.session.create()
        session_key = request.session.session_key
    
    if request.method == 'GET':
        try:
            cart = Cart.objects.get(session_key=session_key)
            serializer = CartSerializer(cart)
            return Response(serializer.data)
        except Cart.DoesNotExist:
            # Return empty cart
            return Response({
                'id': None,
                'session_key': session_key,
                'items': [],
                'total_items': 0,
                'total_price': 0
            })
    
    elif request.method == 'POST':
        # Add item to cart
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)
        
        if not product_id:
            return Response(
                {'error': 'Product ID is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            product = Product.objects.get(id=product_id, available=True)
        except Product.DoesNotExist:
            return Response(
                {'error': 'Product not found or not available'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Get or create cart
        cart, created = Cart.objects.get_or_create(session_key=session_key)
        
        # Get or create cart item
        cart_item, item_created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': quantity}
        )
        
        if not item_created:
            # Update quantity if item already exists
            cart_item.quantity += quantity
            cart_item.save()
        
        # Check stock
        if cart_item.quantity > product.stock:
            return Response(
                {'error': f'Not enough stock. Available: {product.stock}'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT', 'DELETE'])
def cart_item_view(request, item_id):
    """
    Handle individual cart item operations - update or remove
    """
    session_key = request.session.session_key
    if not session_key:
        return Response(
            {'error': 'No active session'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        cart_item = CartItem.objects.get(
            id=item_id, 
            cart__session_key=session_key
        )
    except CartItem.DoesNotExist:
        return Response(
            {'error': 'Cart item not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    if request.method == 'PUT':
        # Update item quantity
        quantity = request.data.get('quantity')
        if not quantity or quantity <= 0:
            return Response(
                {'error': 'Valid quantity is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if quantity > cart_item.product.stock:
            return Response(
                {'error': f'Not enough stock. Available: {cart_item.product.stock}'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        cart_item.quantity = quantity
        cart_item.save()
        
        serializer = CartSerializer(cart_item.cart)
        return Response(serializer.data)
    
    elif request.method == 'DELETE':
        # Remove item from cart
        cart = cart_item.cart
        cart_item.delete()
        
        serializer = CartSerializer(cart)
        return Response(serializer.data)