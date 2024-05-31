from rest_framework import generics, permissions
from ..models import Coin
from .serializers import CoinSerializer

class CoinCreateView(generics.CreateAPIView):
    queryset = Coin.objects.all()
    serializer_class = CoinSerializer
    permission_classes = [permissions.IsAuthenticated]

class CoinDetailView(generics.RetrieveAPIView):
    queryset = Coin.objects.all()
    serializer_class = CoinSerializer
    permission_classes = [permissions.IsAuthenticated]

class CoinListView(generics.ListAPIView):
    queryset = Coin.objects.all()
    serializer_class = CoinSerializer
    permission_classes = [permissions.IsAuthenticated]
