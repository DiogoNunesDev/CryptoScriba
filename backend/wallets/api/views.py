from rest_framework import generics, permissions
from ..models import Wallet
from .serializers import WalletSerializer
from logs.utils import log_wallet_creation, log_wallet_update

class WalletCreateView(generics.CreateAPIView):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        wallet = serializer.save(user=self.request.user)
        log_wallet_creation(self.request.user, wallet)

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

    def perform_update(self, serializer):
        wallet = serializer.save()
        log_wallet_update(self.request.user, wallet)
    
class WalletListView(generics.ListAPIView):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
