from django.urls import path
from .views import WalletCreateView, WalletDetailView, WalletUpdateView, WalletListView

urlpatterns = [
    path('create/', WalletCreateView.as_view(), name='wallet-create'),
    path('detail/', WalletDetailView.as_view(), name='wallet-detail'),
    path('detail/update/', WalletUpdateView.as_view(), name='wallet-update'),
    path('', WalletListView.as_view(), name='wallet-list'),
]