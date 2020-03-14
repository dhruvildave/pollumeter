import graphene

import pollumeterbeta.schema

class Query(pollumeterbeta.schema.Query,graphene.ObjectType):
    pass

schema=graphene.Schema(query=Query)

