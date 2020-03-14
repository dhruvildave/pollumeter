import graphene
from graphene_django import DjangoObjectType
from django.db.models import Q

from .models import pollimetermodel


class pollumeterType(DjangoObjectType):
    class Meta:
        model = pollimetermodel


class Query(graphene.ObjectType):

    datapol = graphene.List(pollumeterType)

    def resolve_datapol(self, info, numberrecords=None, startdatetime=None, enddatetime=None, **kwargs):
        if startdatetime and enddatetime:
            filter = (Q(datetime__gte=startdatetime,
                        recordDate__lte=enddatetime))
            return pollimetermodel.objects.filter(filter)
        if numberrecords:
            return pollimetermodel.objects.all()[-numberrecords]
        return pollimetermodel.objects.all()
