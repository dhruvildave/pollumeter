import graphene
from graphene_django import DjangoObjectType
from django.db.models import Q
from datetime import datetime
from .models import pollimetermodel
from .models import predicted
from .models import bar_char


class pollumeterType(DjangoObjectType):
    class Meta:
        model = pollimetermodel


class Query(graphene.ObjectType):

    datapol = graphene.List(pollumeterType, numberrecords=graphene.Int(
    ), startdatetime=graphene.String(), enddatetime=graphene.String(), area=graphene.String())

    def resolve_datapol(self, info, numberrecords=None, startdatetime=None, enddatetime=None, area=None, **kwargs):
        if startdatetime and enddatetime and area:
            filter = (Q(datetime__gte=startdatetime,
                        datetime__lte=enddatetime, area__icontains=area))
            return pollimetermodel.objects.filter(filter)
        x = 75665
        if numberrecords and area:
            filter = (Q(area__icontains=area))
            return pollimetermodel.objects.filter(filter).order_by("-id")[:100]
        if area:
            return pollimetermodel.objects.filter((Q(area__icontains=area)))
        return pollimetermodel.objects.all()

    predict = graphene.List(
        predicted, indpro=graphene.Float(), traf=graphene.Float())

    def resolve_predict(self, info, indpro, traf):
        # load trained model
        # a=model.predict(indpro,traf)
        # return predicted(a[0], a[1], a[2], a[3])
        pass

    piechar = graphene.List(
        bar_char, indpro=graphene.Float(), traf=graphene.Float())

    def resolve_piechar(self, info, indpro, traf):
        # a=model.predict(indpro,traf)
        # b=model.predict(0,traf)
        # c=model.predict(indrpo.traf)

        return bar_char(b*100/a, c*100/a)
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
