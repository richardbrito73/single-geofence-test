from rest_framework import serializers
from api.models import TrackingTrajectory


class PolygonGeofenceSerializer(serializers.Serializer):
    polygon = serializers.JSONField()

class TrackingSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    address = serializers.CharField()
    latitude = serializers.FloatField()
    longitude = serializers.FloatField()
    geofence = serializers.BooleanField()
    time = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return TrackingTrajectory.objects.create(**validated_data)