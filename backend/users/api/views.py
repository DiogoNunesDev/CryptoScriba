from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django_otp.plugins.otp_totp.models import TOTPDevice
from django.contrib.auth import authenticate
from ..models import CustomUser
from .serializers import TOTPSetupSerializer, TOTPVerifySerializer, UserSerializer, RegisterSerializer
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from ...logs.utils import log_user_registration, log_user_login, log_failed_login_attempt, log_user_logout

import logging

logger = logging.getLogger(__name__)

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    
    def perform_create(self, serializer):
        user = serializer.save()
        log_user_registration(user)

class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    throttle_classes = [AnonRateThrottle, UserRateThrottle]


    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)

        if user is not None:
            if user.is_mfa_enabled:
                refresh = RefreshToken.for_user(user)
                log_user_login(user)
                return Response({
                    "mfa_required": True,
                    "user_id": user.id,
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                }, status=status.HTTP_200_OK)
            else:
                refresh = RefreshToken.for_user(user)
                log_user_login(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': UserSerializer(user).data
                }, status=status.HTTP_200_OK)
        log_failed_login_attempt(email)
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)



class TOTPVerifyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        serializer = TOTPVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        otp_token = serializer.validated_data['otp_token']
        if user.otp_device.verify_token(otp_token):
            user.otp_device.confirmed = True
            user.otp_device.save()
            user.is_mfa_enabled = True
            user.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            }, status=status.HTTP_200_OK)

        return Response({"detail": "Invalid OTP token"}, status=status.HTTP_400_BAD_REQUEST)

class TOTPSetupView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.otp_device and user.otp_device.confirmed:
            return Response({"detail": "MFA already configured"}, status=status.HTTP_400_BAD_REQUEST)

        device, created = TOTPDevice.objects.get_or_create(user=user, confirmed=False)

        if created:
            logger.info(f"Created new TOTPDevice for user {user.id}")
        else:
            logger.info(f"Retrieved existing TOTPDevice for user {user.id}")

        otp_secret = device.key  # No need to decode the key
        otp_uri = device.config_url

        logger.debug(f"OTP Secret: {otp_secret}, OTP URI: {otp_uri}")

        return Response(TOTPSetupSerializer({"otp_secret": otp_secret, "otp_uri": otp_uri}).data)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            log_user_logout(request.user)
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class NonStaffUserListView(generics.ListAPIView):
    queryset = CustomUser.objects.filter(is_staff=False)
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
