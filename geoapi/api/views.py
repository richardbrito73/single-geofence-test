from django.db.models import lookups, query
from django.shortcuts import render
from rest_framework import serializers
from rest_framework.mixins import ListModelMixin, CreateModelMixin
from rest_framework.generics import  ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response

from api.models import TrackingTrajectory, PolygonGeofence, json_polygon_file
from api.serializers import TrackingSerializer, PolygonGeofenceSerializer

# Create your views here.
class PolygonGeofenceAPIView(ViewSet):
    def retrieve(self, request, pk=None):
        try:    
            queryset = PolygonGeofence.objects.latest('polygon')
            serializer = PolygonGeofenceSerializer(queryset)
            return Response(serializer.data)
        except PolygonGeofence.DoesNotExist:
            return Response("Not Polygon Active.")
    
    def create(self, request):
        data = json_polygon_file()
        polygon = PolygonGeofence(polygon=data)
        polygon.save()
        serializer = PolygonGeofenceSerializer(polygon)
        return Response(serializer.data)

class TrakingAPIView(ListCreateAPIView):
    serializer_class = TrackingSerializer
    queryset = TrackingTrajectory.objects.all()

class TrackingSingleAPIView(RetrieveUpdateDestroyAPIView):
    queryset = TrackingTrajectory.objects.all()
    serializer_class = TrackingSerializer

    
