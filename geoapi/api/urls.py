from django.urls import include, path
from rest_framework import routers
from api.views import TrakingAPIView

# router = routers.DefaultRouter()
# router.register(r'tracking', TrakingAPIView)

urlpatterns = [
    path('tracking/', TrakingAPIView.as_view()),
]
