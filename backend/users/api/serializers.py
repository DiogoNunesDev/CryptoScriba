from rest_framework import serializers
from ..models import CustomUser
from wallets.models import Wallet

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'full_name', 'last_login', 'date_joined', 'wallet']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'full_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            name=validated_data['full_name'],
            password=validated_data['password']
        )
        if not user.is_staff:  # Create a wallet only if the user is not an admin
            Wallet.objects.create(user=user)
        return user
