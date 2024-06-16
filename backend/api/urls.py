from django.urls import path, include
from .views import ApiRootView, DatabaseBackupView

urlpatterns = [
    path('', ApiRootView.as_view(), name='api-root'),  # Base path for the API
    path('coins/', include('coins.api.urls')),
    path('users/', include('users.api.urls')),
    path('wallets/', include('wallets.api.urls')),
    path('transactions/', include('transactions.api.urls')),
    path('logs/', include('logs.api.urls')),
    path('backup/', DatabaseBackupView.as_view(), name='database_backup'),

]
