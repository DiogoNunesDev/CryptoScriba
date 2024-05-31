from rest_framework import serializers
from ..models import Wallet

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ['id', 'user', 'unique_identifier', 'balance']
        read_only_fields = ['id', 'user']
