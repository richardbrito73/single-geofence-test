from django.shortcuts import render
from rest_framework.mixins import ListModelMixin, CreateModelMixin
from rest_framework.generics import GenericAPIView, ListCreateAPIView

from api.models import TrackingTrajectory
from api.serializers import TrackingSerializer

# Create your views here.
class TrakingAPIView(ListCreateAPIView):
    serializer_class = TrackingSerializer
    queryset = TrackingTrajectory.objects.all()