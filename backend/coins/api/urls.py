from django.urls import path
from .views import CoinCreateView, CoinDetailView, CoinListView

urlpatterns = [
    path('create/', CoinCreateView.as_view(), name='coin-create'),
    path('<int:pk>/', CoinDetailView.as_view(), name='coin-detail'),
    path('', CoinListView.as_view(), name='coin-list'),
]
