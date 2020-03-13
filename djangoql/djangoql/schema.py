import graphene
from polls.schema import Query as polls_schema_query

class Query(polls_schema_query):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass

schema = graphene.Schema(query=Query)
introspection_dict = schema.introspect()

