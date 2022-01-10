import json

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

def json_polygon_file():
    with open('api/data/geofence.json') as file:
       return json.load(file)

class PolygonGeofence(models.Model):
    polygon = models.JSONField(null=False, default=json_polygon_file)


