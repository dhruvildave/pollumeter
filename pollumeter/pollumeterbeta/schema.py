import graphene
from graphene_django import DjangoObjectType
from django.db.models import Q
from datetime import datetime
from .models import pollimetermodel
from .models import predicted
from .models import bar_char

from .model import main as modelpred


class pollumeterType(DjangoObjectType):
    class Meta:
        model = pollimetermodel


class predictedType(DjangoObjectType):
    class Meta:
        model = predicted


class bar_charType(DjangoObjectType):
    class Meta:
        model = bar_char


class Query(graphene.ObjectType):

    datapol = graphene.List(pollumeterType, numberrecords=graphene.Int(
    ), startdatetime=graphene.String(), enddatetime=graphene.String(), area=graphene.String())

    def resolve_datapol(self, info, numberrecords=None, startdatetime=None, enddatetime=None, area=None, **kwargs):
        if startdatetime and enddatetime and area and numberrecords:
            filter = (Q(datetime__gte=startdatetime,
                        datetime__lte=enddatetime, area__icontains=area))
            return pollimetermodel.objects.filter(filter).order_by("-id")[:numberrecords]
        if startdatetime and enddatetime and area:
            filter = (Q(datetime__gte=startdatetime,
                        datetime__lte=enddatetime, area__icontains=area))
            return pollimetermodel.objects.filter(filter)

        x = 75665
        if numberrecords and area:
            filter = (Q(area__icontains=area))
            return pollimetermodel.objects.filter(filter).order_by("-id")[:numberrecords]
        if area:
            return pollimetermodel.objects.filter((Q(area__icontains=area)))
        return pollimetermodel.objects.all()

    predict = graphene.Field(
        predictedType, indpro=graphene.Float(), traf=graphene.Float())

    def resolve_predict(self, info, indpro, traf):

        a = modelpred([[indpro, traf]])[0]
        return predicted.objects.create(aqi=a[0], aqi2=a[1], aqi3=a[2], aqi4=a[3])

    piechar = graphene.Field(
        bar_charType, indpro=graphene.Float(), traf=graphene.Float())

    def resolve_piechar(self, info, indpro, traf):
        a = modelpred([[indpro, traf]])[0]
        b = modelpred([[0, traf]])[0]
        c = modelpred([[indpro.traf]])[0]

        return bar_char.objects.create(traf=b*100/a, industrialproduction=c*100/a)
# query{
#     datapol(area: "Foster", startdatetime: "2016-12-18", enddatetime: "2017-12-18"){
#         datetime
#         polCo2
#         polSo2
#         polNo2
#         polCo
#         polPm10
#         polPm25
#         aqi
#         area
#     }
# }
