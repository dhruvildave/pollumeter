from django.db import models


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
    indpro = models.FloatField()

    area = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    active_population = models.FloatField()
    traf = models.FloatField()
    barometric_pressure = models.FloatField(null=True)


class predicted(models.Model):
    aqi = models.FloatField()
    aqi2 = models.FloatField()
    aqi3 = models.FloatField()
    aqi4 = models.FloatField()


class bar_char(models.Model):
    traf = models.FloatField()
    industrialproduction = models.FloatField()
