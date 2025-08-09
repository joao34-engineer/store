from django.shortcuts import render, redirect
from django.conf import settings

def home(request):
    """Home page view"""
    return render(request, 'home.html')

def about(request):
    """About page view"""
    return render(request, 'about.html')

def store_template(request):
    """Modern store template view"""
    return render(request, 'store-template.html')

def main_store(request):
    """Organized main store with components and Playfair Display font"""
    return render(request, 'main-store.html')

def spa(request):
    """Redirect to Vite dev server in development.
    In production, serve the built SPA via staticfiles or a separate host.
    """
    if settings.DEBUG:
        return redirect('http://localhost:5173/')
    return redirect('/')
