# Generated by Django 3.0.3 on 2020-03-14 20:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pollumeterbeta', '0002_auto_20200314_2023'),
    ]

    operations = [
        migrations.AddField(
            model_name='pollimetermodel',
            name='barometric_pressure',
            field=models.FloatField(null=True),
        ),
    ]
