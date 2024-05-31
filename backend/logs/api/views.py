from rest_framework import generics, permissions
from ..models import ActivityLog
from .serializers import ActivityLogSerializer

class ActivityLogListView(generics.ListAPIView):
    queryset = ActivityLog.objects.all()
    serializer_class = ActivityLogSerializer
    permission_classes = [permissions.IsAuthenticated]
