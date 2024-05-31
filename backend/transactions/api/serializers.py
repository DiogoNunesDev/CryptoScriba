from rest_framework import serializers
from ..models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'user', 'transaction_type', 'amount', 'coin', 'wallet_from', 'wallet_to', 'timestamp']
        read_only_fields = ['id', 'timestamp']
