import graphene
from polls.schema import Query as polls_schema_query

# Added this line for federation
from graphene_federation import build_schema

class Query(polls_schema_query):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass


# Replaced the following line
# schema = graphene.Schema(query=Query)
schema = build_schema(Query)

introspection_dict = schema.introspect()

