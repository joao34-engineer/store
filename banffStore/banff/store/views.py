from django.shortcuts import render
from django.views.generic import TemplateView

# Template-based views for admin/management interface
# Main frontend is handled by React

class AdminDashboardView(TemplateView):
    """Simple admin dashboard - can be expanded later"""
    template_name = 'admin/dashboard.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Add any admin context data here
        return context

# API views have been moved to api/views.py for better organization


