from django.urls import path
from .views import RegisterView, UserDetailView, LogoutView, NonStaffUserListView, TOTPSetupView, TOTPVerifyView, CustomTokenObtainPairView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('totp/setup/', TOTPSetupView.as_view(), name='totp-setup'),
    path('totp/verify/', TOTPVerifyView.as_view(), name='totp-verify'),
    path('me/', UserDetailView.as_view(), name='user-detail'),
    path('', NonStaffUserListView.as_view(), name='non-staff-user-list'),
]
