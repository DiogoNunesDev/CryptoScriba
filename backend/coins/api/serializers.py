from rest_framework import serializers
from ..models import Coin

class CoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coin
        fields = ['id', 'name', 'tag', 'buy_value', 'sell_value']
        read_only_fields = ['id']
