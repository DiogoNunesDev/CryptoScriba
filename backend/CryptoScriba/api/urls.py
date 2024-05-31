from django.urls import path, include

url_patterns = [
  path('coins/', include('coins.api.urls')),
  path('users/', include('users.api.urls')),
]