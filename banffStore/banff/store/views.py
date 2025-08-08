from django.shortcuts import render, get_object_or_404, redirect
from django.db.models import Q
from django.contrib import messages
from django.views.decorators.http import require_POST
from .models import Product, Category, Cart, CartItem, Order, OrderItem


def _get_or_create_cart(request):
    if request.user.is_authenticated:
        cart, _ = Cart.objects.get_or_create(user=request.user)
        return cart
    # Ensure session exists
    if not request.session.session_key:
        request.session.create()
    cart, _ = Cart.objects.get_or_create(session_key=request.session.session_key)
    return cart


def product_list(request, slug=None):
    """View to display all products with basic search/sort/pagination.
    If category slug provided, filter by category.
    """
    products = Product.objects.filter(available=True)
    categories = Category.objects.all()
    category = None

    if slug:
        category = get_object_or_404(Category, slug=slug)
        products = products.filter(category=category)

    q = request.GET.get("q")
    if q:
        products = products.filter(Q(name__icontains=q) | Q(description__icontains=q))

    sort = request.GET.get("sort")
    if sort == "price_asc":
        products = products.order_by("price")
    elif sort == "price_desc":
        products = products.order_by("-price")

    context = {
        'products': products,
        'categories': categories,
        'active_category': category,
    }
    return render(request, 'store/product_list.html', context)


def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug, available=True)
    related = Product.objects.filter(category=product.category, available=True).exclude(id=product.id)[:4]
    return render(request, 'store/product_detail.html', {"product": product, "related": related})


def cart_detail(request):
    cart = _get_or_create_cart(request)
    items = cart.items.select_related("product")
    total = sum([i.get_total_price() for i in items])
    return render(request, 'store/cart_detail.html', {"cart": cart, "items": items, "total": total})


@require_POST
def add_to_cart(request):
    cart = _get_or_create_cart(request)
    product_slug = request.POST.get("product")
    qty = int(request.POST.get("quantity", 1))
    product = get_object_or_404(Product, slug=product_slug, available=True)
    item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if created:
        item.quantity = qty
    else:
        item.quantity += qty
    item.save()
    messages.success(request, f"Added {product.name} to cart.")
    return redirect('store:cart_detail')


@require_POST
def update_cart_item(request, item_id):
    cart = _get_or_create_cart(request)
    item = get_object_or_404(CartItem, id=item_id, cart=cart)
    qty = int(request.POST.get("quantity", 1))
    if qty <= 0:
        item.delete()
    else:
        item.quantity = qty
        item.save()
    return redirect('store:cart_detail')


@require_POST
def remove_from_cart(request, item_id):
    cart = _get_or_create_cart(request)
    item = get_object_or_404(CartItem, id=item_id, cart=cart)
    item.delete()
    return redirect('store:cart_detail')


def checkout(request):
    cart = _get_or_create_cart(request)
    items = list(cart.items.select_related("product"))
    if not items:
        messages.info(request, "Your cart is empty.")
        return redirect('store:product_list')

    if request.method == "POST":
        full_name = request.POST.get("full_name")
        email = request.POST.get("email")
        address = request.POST.get("address")
        city = request.POST.get("city")
        postal_code = request.POST.get("postal_code")
        country = request.POST.get("country") or ""

        if not all([full_name, email, address, city, postal_code]):
            messages.error(request, "Please complete all required fields.")
            return render(request, 'store/checkout.html', {"items": items})

        order = Order.objects.create(
            user=request.user if request.user.is_authenticated else None,
            email=email,
            full_name=full_name,
            address=address,
            city=city,
            postal_code=postal_code,
            country=country,
            paid=False,
        )
        # create order items
        for ci in items:
            OrderItem.objects.create(order=order, product=ci.product, price=ci.product.price, quantity=ci.quantity)
            # reduce stock safely
            ci.product.stock = max(0, ci.product.stock - ci.quantity)
            if ci.product.stock == 0:
                ci.product.available = False
            ci.product.save()
        # clear cart
        cart.items.all().delete()
        messages.success(request, "Order created. In a real app, redirect to payment provider.")
        return redirect('store:order_success', order_id=order.id)

    total = sum([i.get_total_price() for i in items])
    return render(request, 'store/checkout.html', {"items": items, "total": total})


def order_success(request, order_id):
    order = get_object_or_404(Order, id=order_id)
    return render(request, 'store/order_success.html', {"order": order})


