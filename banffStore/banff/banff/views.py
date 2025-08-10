# Django views for template rendering have been removed
# Frontend is now handled by React + TypeScript
# Keep this file for potential future API views

from django.http import JsonResponse

def api_status(request):
    """Simple API status endpoint"""
    return JsonResponse({'status': 'API is running', 'frontend': 'React + TypeScript'})
