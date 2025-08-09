from django.shortcuts import get_object_or_404
from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from store.models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

class CategoryViewSet(mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      viewsets.GenericViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

class ProductViewSet(mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     viewsets.GenericViewSet):
    queryset = Product.objects.select_related('category').filter(available=True).order_by('-id')
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = {
        'category__slug': ['exact'],
        'price': ['gte', 'lte'],
    }
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'name', 'id']

class CartViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def _get_cart(self, request):
        cart = request.session.get('cart', {})
        return {str(k): int(v) for k, v in cart.items()}

    def _save_cart(self, request, cart):
        request.session['cart'] = cart
        request.session.modified = True

    def list(self, request):
        cart = self._get_cart(request)
        product_ids = [int(pid) for pid in cart.keys()]
        products = Product.objects.filter(id__in=product_ids).select_related('category')
        items = []
        total = 0.0
        for p in products:
            qty = cart.get(str(p.id), 0)
            line_total = float(p.price) * qty
            items.append({
                'product': ProductSerializer(p, context={'request': request}).data,
                'quantity': qty,
                'line_total': line_total,
            })
            total += line_total
        return Response({'items': items, 'total': total})

    @action(detail=False, methods=['post'])
    def add(self, request):
        product_id = request.data.get('product')
        qty = int(request.data.get('quantity', 1))
        if not product_id:
            return Response({'detail': 'product is required'}, status=400)
        if isinstance(product_id, str) and not product_id.isdigit():
            product = get_object_or_404(Product, slug=product_id)
            pid = str(product.id)
        else:
            product = get_object_or_404(Product, id=int(product_id))
            pid = str(product.id)
        cart = self._get_cart(request)
        cart[pid] = cart.get(pid, 0) + max(qty, 1)
        self._save_cart(request, cart)
        return Response({'detail': 'added'})

    @action(detail=False, methods=['post'], url_path='set')
    def set_quantity(self, request):
        product_id = request.data.get('product')
        qty = int(request.data.get('quantity', 1))
        if product_id is None:
            return Response({'detail': 'product is required'}, status=400)
        if isinstance(product_id, str) and not product_id.isdigit():
            product = get_object_or_404(Product, slug=product_id)
            pid = str(product.id)
        else:
            product = get_object_or_404(Product, id=int(product_id))
            pid = str(product.id)
        cart = self._get_cart(request)
        if qty <= 0:
            cart.pop(pid, None)
        else:
            cart[pid] = qty
        self._save_cart(request, cart)
        return Response({'detail': 'updated'})

    @action(detail=False, methods=['post'])
    def remove(self, request):
        product_id = request.data.get('product')
        if product_id is None:
            return Response({'detail': 'product is required'}, status=400)
        if isinstance(product_id, str) and not product_id.isdigit():
            product = get_object_or_404(Product, slug=product_id)
            pid = str(product.id)
        else:
            product = get_object_or_404(Product, id=int(product_id))
            pid = str(product.id)
        cart = self._get_cart(request)
        cart.pop(pid, None)
        self._save_cart(request, cart)
        return Response({'detail': 'removed'})
