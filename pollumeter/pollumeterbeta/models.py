from django.db import models

# Create your models here.


class pollimetermodel(models.Model):
    datetime = models.DateTimeField(auto_now=False, blank=True)
    weather_temp = models.FloatField()
    weather_humidity = models.FloatField()
    measurement_id = models.CharField(max_length=255, null=True)
    pol_co = models.FloatField()
    pol_so2 = models.FloatField()
    pol_no2 = models.FloatField()
    pol_pm10 = models.FloatField()
    pol_pm25 = models.FloatField()
    pol_co2 = models.FloatField()
    aqi = models.FloatField()
    lat = models.FloatField()
    long = models.FloatField()
    fac_indfood = models.FloatField()
    fac_indpharm = models.FloatField()
    fac_indtech = models.FloatField()
    fac_indman = models.FloatField()
    fac_indfert = models.FloatField()
    area = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    active_population = models.FloatField()
    fac_avg_speed = models.FloatField()
    barometric_pressure = models.FloatField(null=True)
