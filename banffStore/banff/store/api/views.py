from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import Q, Avg
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

from ..models import (
    Product, Category, Brand, Cart, CartItem, Wishlist, ProductReview,
    Order, Coupon, UserProfile
)
from .serializers import (
    ProductListSerializer, ProductDetailSerializer, CategorySerializer, BrandSerializer,
    CartSerializer, CartItemSerializer, WishlistSerializer,
    ProductReviewSerializer, ProductReviewCreateSerializer, OrderSerializer,
    CouponSerializer, UserSerializer, UserProfileSerializer
)

class StandardResultsSetPagination(PageNumberPagination):
    """Custom pagination for API responses"""
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

class ProductListView(generics.ListAPIView):
    """
    List all products with filtering, search, and ordering capabilities
    """
    serializer_class = ProductListSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['name', 'description', 'short_description', 'sku']
    ordering_fields = ['name', 'price', 'created_at', 'average_rating']
    ordering = ['-created_at']
    
    def get_queryset(self):
        queryset = Product.objects.filter(status='active').select_related('category', 'brand')
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            try:
                category_obj = Category.objects.get(slug=category, is_active=True)
                # Include subcategories
                category_ids = [category_obj.id]
                category_ids.extend(category_obj.children.filter(is_active=True).values_list('id', flat=True))
                queryset = queryset.filter(category__id__in=category_ids)
            except Category.DoesNotExist:
                pass
        
        # Filter by brand
        brand = self.request.query_params.get('brand')
        if brand:
            queryset = queryset.filter(brand__slug=brand)
        
        # Filter by price range
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        # Filter by availability
        in_stock = self.request.query_params.get('in_stock')
        if in_stock and in_stock.lower() == 'true':
            queryset = queryset.filter(stock__gt=0)
        
        # Filter by featured
        featured = self.request.query_params.get('featured')
        if featured and featured.lower() == 'true':
            queryset = queryset.filter(is_featured=True)
        
        # Filter by rating
        min_rating = self.request.query_params.get('min_rating')
        if min_rating:
            queryset = queryset.annotate(
                avg_rating=Avg('reviews__rating')
            ).filter(avg_rating__gte=min_rating)
        
        return queryset.distinct()

class ProductDetailView(generics.RetrieveAPIView):
    """
    Retrieve a single product by ID or slug
    """
    serializer_class = ProductDetailSerializer
    lookup_field = 'slug'
    
    def get_queryset(self):
        return Product.objects.filter(status='active').select_related('category', 'brand').prefetch_related(
            'images', 'variants', 'reviews__user'
        )

class CategoryListView(generics.ListAPIView):
    """
    List all active categories
    """
    serializer_class = CategorySerializer
    queryset = Category.objects.filter(is_active=True, parent=None).order_by('sort_order', 'name')

class BrandListView(generics.ListAPIView):
    """
    List all active brands
    """
    serializer_class = BrandSerializer
    queryset = Brand.objects.filter(is_active=True).order_by('name')

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_view(request):
    """
    User registration endpoint
    """
    try:
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        first_name = request.data.get('first_name', '')
        last_name = request.data.get('last_name', '')
        
        if not username or not email or not password:
            return Response({
                'error': 'Username, email, and password are required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return Response({
                'error': 'Username already exists'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({
                'error': 'Email already exists'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name
        )
        
        # Create user profile
        UserProfile.objects.create(user=user)
        
        # Create auth token
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            'user': UserSerializer(user).data,
            'token': token.key
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({
            'error': 'Registration failed'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_view(request):
    """
    User login endpoint
    """
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({
            'error': 'Username and password are required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(username=username, password=password)
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'user': UserSerializer(user).data,
            'token': token.key
        })
    else:
        return Response({
            'error': 'Invalid credentials'
        }, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def logout_view(request):
    """
    User logout endpoint
    """
    try:
        request.user.auth_token.delete()
    except:
        pass
    return Response({'message': 'Logged out successfully'})

@api_view(['GET', 'POST'])
def cart_view(request):
    """
    Handle cart operations - get cart or add items
    """
    # Get or create cart
    if request.user.is_authenticated:
        cart, created = Cart.objects.get_or_create(user=request.user)
    else:
        session_key = request.session.session_key
        if not session_key:
            request.session.create()
            session_key = request.session.session_key
        cart, created = Cart.objects.get_or_create(session_key=session_key)
    
    if request.method == 'GET':
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        # Add item to cart
        product_id = request.data.get('product_id')
        variant_id = request.data.get('variant_id')
        quantity = int(request.data.get('quantity', 1))
        
        try:
            product = Product.objects.get(id=product_id, status='active')
            
            # Check if item already exists in cart
            cart_item_filter = {'cart': cart, 'product': product}
            if variant_id:
                cart_item_filter['variant_id'] = variant_id
            else:
                cart_item_filter['variant'] = None
            
            cart_item, created = CartItem.objects.get_or_create(
                **cart_item_filter,
                defaults={'quantity': quantity}
            )
            
            if not created:
                cart_item.quantity += quantity
                cart_item.save()
            
            return Response({
                'message': 'Item added to cart',
                'cart': CartSerializer(cart).data
            })
            
        except Product.DoesNotExist:
            return Response({
                'error': 'Product not found'
            }, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT', 'DELETE'])
def cart_item_view(request, item_id):
    """
    Update or remove cart items
    """
    try:
        if request.user.is_authenticated:
            cart_item = CartItem.objects.get(
                id=item_id, 
                cart__user=request.user
            )
        else:
            session_key = request.session.session_key
            cart_item = CartItem.objects.get(
                id=item_id,
                cart__session_key=session_key
            )
    except CartItem.DoesNotExist:
        return Response({
            'error': 'Cart item not found'
        }, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        # Update quantity
        quantity = request.data.get('quantity')
        if quantity and int(quantity) > 0:
            cart_item.quantity = int(quantity)
            cart_item.save()
            return Response({
                'message': 'Cart item updated',
                'cart': CartSerializer(cart_item.cart).data
            })
        else:
            return Response({
                'error': 'Invalid quantity'
            }, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        # Remove item
        cart = cart_item.cart
        cart_item.delete()
        return Response({
            'message': 'Item removed from cart',
            'cart': CartSerializer(cart).data
        })

@api_view(['GET', 'POST'])
@permission_classes([permissions.IsAuthenticated])
def wishlist_view(request):
    """
    Handle wishlist operations
    """
    wishlist, created = Wishlist.objects.get_or_create(user=request.user)
    
    if request.method == 'GET':
        serializer = WishlistSerializer(wishlist)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        product_id = request.data.get('product_id')
        try:
            product = Product.objects.get(id=product_id, status='active')
            if product in wishlist.products.all():
                wishlist.products.remove(product)
                message = 'Product removed from wishlist'
            else:
                wishlist.products.add(product)
                message = 'Product added to wishlist'
            
            return Response({
                'message': message,
                'wishlist': WishlistSerializer(wishlist).data
            })
        except Product.DoesNotExist:
            return Response({
                'error': 'Product not found'
            }, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'POST'])
@permission_classes([permissions.IsAuthenticated])
def reviews_view(request):
    """
    Handle product reviews
    """
    if request.method == 'GET':
        product_id = request.query_params.get('product_id')
        if product_id:
            reviews = ProductReview.objects.filter(
                product_id=product_id, 
                is_approved=True
            ).order_by('-created_at')
            
            paginator = StandardResultsSetPagination()
            page = paginator.paginate_queryset(reviews, request)
            serializer = ProductReviewSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)
        else:
            return Response({
                'error': 'Product ID is required'
            }, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'POST':
        serializer = ProductReviewCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def orders_view(request):
    """
    List user orders
    """
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    paginator = StandardResultsSetPagination()
    page = paginator.paginate_queryset(orders, request)
    serializer = OrderSerializer(page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def order_detail_view(request, order_number):
    """
    Get order details
    """
    try:
        order = Order.objects.get(order_number=order_number, user=request.user)
        serializer = OrderSerializer(order)
        return Response(serializer.data)
    except Order.DoesNotExist:
        return Response({
            'error': 'Order not found'
        }, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def validate_coupon_view(request):
    """
    Validate coupon code
    """
    code = request.data.get('code')
    cart_total = request.data.get('cart_total', 0)
    
    if not code:
        return Response({
            'error': 'Coupon code is required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        coupon = Coupon.objects.get(code=code.upper())
        
        if not coupon.is_valid:
            return Response({
                'error': 'Coupon is not valid or has expired'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if coupon.minimum_amount and float(cart_total) < float(coupon.minimum_amount):
            return Response({
                'error': f'Minimum order amount is R$ {coupon.minimum_amount:.2f}'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Calculate discount
        if coupon.discount_type == 'percentage':
            discount = float(cart_total) * float(coupon.discount_value) / 100
        else:
            discount = float(coupon.discount_value)
        
        return Response({
            'valid': True,
            'coupon': CouponSerializer(coupon).data,
            'discount_amount': discount
        })
        
    except Coupon.DoesNotExist:
        return Response({
            'error': 'Invalid coupon code'
        }, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_profile_view(request):
    """
    Get user profile
    """
    try:
        profile = UserProfile.objects.get(user=request.user)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)
    except UserProfile.DoesNotExist:
        # Create profile if it doesn't exist
        profile = UserProfile.objects.create(user=request.user)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

@api_view(['GET'])
def search_view(request):
    """
    Advanced product search
    """
    query = request.query_params.get('q', '')
    if not query:
        return Response({
            'error': 'Search query is required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Search in products
    products = Product.objects.filter(
        Q(name__icontains=query) |
        Q(description__icontains=query) |
        Q(short_description__icontains=query) |
        Q(category__name__icontains=query) |
        Q(brand__name__icontains=query),
        status='active'
    ).distinct()
    
    paginator = StandardResultsSetPagination()
    page = paginator.paginate_queryset(products, request)
    serializer = ProductListSerializer(page, many=True)
    return paginator.get_paginated_response(serializer.data)
