from rest_framework import generics, permissions
from ..models import Wallet
from .serializers import WalletSerializer

class WalletCreateView(generics.CreateAPIView):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class WalletDetailView(generics.RetrieveAPIView):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.wallet

class WalletUpdateView(generics.UpdateAPIView):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.wallet
    
class WalletListView(generics.ListAPIView):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer
    permission_classes = [permissions.IsAuthenticated]
