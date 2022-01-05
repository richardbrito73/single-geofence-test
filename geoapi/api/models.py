from django.db import models

# Create your models here.
class TrackingTrajectory(models.Model):
    address = models.CharField(max_length=255)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    geofence = models.BooleanField()
    time = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['time']