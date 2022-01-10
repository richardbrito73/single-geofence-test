from django.urls import include, path
from rest_framework import routers
from api.views import TrakingAPIView, TrackingSingleAPIView, PolygonGeofenceAPIView

# router = routers.DefaultRouter()
# router.register(r'tracking', TrakingAPIView)

urlpatterns = [
    path('tracking/', TrakingAPIView.as_view()),
    path('tracking/<int:pk>', TrackingSingleAPIView.as_view()),
    path('polygon/', PolygonGeofenceAPIView.as_view({'get': 'retrieve', 'post': 'create'}))
]
