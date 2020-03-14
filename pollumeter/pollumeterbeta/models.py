from django.db import models

# Create your models here.
class pollimetermodel(models.Model):
    datetime=models.DateTimeField(auto_now=False,blank=True)
    long=models.FloatField()
    lat=models.FloatField()
    city=models.CharField(max_length=255)
    area=models.CharField(max_length=255)
    pol_co2=models.FloatField()
    pol_co=models.FloatField()
    pol_so2=models.FloatField()
    pol_no2=models.FloatField()
    pol_no=models.FloatField()
    pol_AQI=models.FloatField()
    pol_pm25=models.FloatField()
    pol_pm10=models.FloatField()
    pol_bc=models.FloatField()
    fac_JAM=models.FloatField()
    fac_avgspeed=models.FloatField()
    fac_indfert=models.FloatField()
    fac_indman=models.FloatField()
    fac_indtech=models.FloatField()
    fac_indpharm=models.FloatField()
    fac_indfood=models.FloatField()
    active_population=models.FloatField()
    weather_temp=models.FloatField()
    weather_humidity=models.FloatField()
    