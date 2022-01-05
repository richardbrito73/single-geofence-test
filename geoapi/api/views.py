from django.shortcuts import render
from rest_framework.mixins import ListModelMixin, CreateModelMixin
from rest_framework.generics import GenericAPIView, ListCreateAPIView

from api.models import TrackingTrajectory
from api.serializers import TrackingSerializer

# Create your views here.
class TrakingAPIView(ListCreateAPIView):
    serializer_class = TrackingSerializer
    queryset = TrackingTrajectory.objects.all()

    # def perform_create(self, serializer):
    #     return super().perform_create(serializer)
    # def create(self, request, *args, **kwargs):
    #     return ser
        # return self.create(request, *args, **kwargs)

    # def post(self, request, *args, **kwargs):
    #     return self.create(request, *args, **kwargs)