from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from ..models import Coin
from .serializers import CoinSerializer


class CoinCreateView(generics.CreateAPIView):
    queryset = Coin.objects.all()
    serializer_class = CoinSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def perform_create(self, serializer):
        coin = serializer.save()

class CoinDetailView(generics.RetrieveAPIView):
    queryset = Coin.objects.all()
    serializer_class = CoinSerializer
    permission_classes = [IsAuthenticated]

class CoinListView(generics.ListAPIView):
    queryset = Coin.objects.all()
    serializer_class = CoinSerializer
    permission_classes = [IsAuthenticated]

class CoinDeleteView(generics.DestroyAPIView):
    queryset = Coin.objects.all()
    serializer_class = CoinSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)