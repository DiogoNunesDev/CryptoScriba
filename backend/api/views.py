from rest_framework.response import Response
from rest_framework.views import APIView

class ApiRootView(APIView):
  def get(self, request):
    return Response({
      'coins': request.build_absolute_uri('coins/'),
      'users': request.build_absolute_uri('users/'),
      'wallets': request.build_absolute_uri('wallets/'),
      'transactions': request.build_absolute_uri('transactions/'),
      'logs': request.build_absolute_uri('logs/'),
    })
