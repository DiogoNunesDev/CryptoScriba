from django.urls import path
from .views import TransactionCreateView, TransactionDetailView, TransactionListView

urlpatterns = [
    path('create/', TransactionCreateView.as_view(), name='transaction-create'),
    path('<int:pk>/', TransactionDetailView.as_view(), name='transaction-detail'),
    path('', TransactionListView.as_view(), name='transaction-list'),
]
