from rest_framework import serializers
from ..models import ActivityLog

class ActivityLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityLog
        fields = ['id', 'user', 'action', 'timestamp', 'details']
        read_only_fields = ['id', 'timestamp']
