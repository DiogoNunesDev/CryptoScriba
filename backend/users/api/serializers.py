from rest_framework import serializers
from ..models import CustomUser
from wallets.models import Wallet
from django_otp.plugins.otp_totp.models import TOTPDevice

class TOTPSetupSerializer(serializers.Serializer):
    otp_secret = serializers.CharField()
    otp_uri = serializers.CharField()

class TOTPVerifySerializer(serializers.Serializer):
    otp_token = serializers.CharField()

class UserSerializer(serializers.ModelSerializer):
    isAdmin = serializers.SerializerMethodField()
    isAuthenticated = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'full_name', 'last_login', 'date_joined', 'wallet', 'isAdmin', 'isAuthenticated', 'is_mfa_enabled']

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_isAuthenticated(self, obj):
        return obj.is_authenticated

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'full_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            full_name=validated_data['full_name'],
            password=validated_data['password']
        )
        Wallet.objects.create(user=user)
        
        # Enabling MFA and creating OTP device
        user.is_mfa_enabled = True
        device = TOTPDevice.objects.create(user=user, confirmed=False)
        user.otp_device = device
        user.save()
        
        return user