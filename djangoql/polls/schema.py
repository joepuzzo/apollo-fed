from graphene_django import DjangoObjectType
from .models import Question as QuestionModel, Choice as ChoiceModel
import graphene

class Question(DjangoObjectType):
    class Meta:
        model = QuestionModel

class Choice(DjangoObjectType):
    class Meta:
        model = ChoiceModel

class Query(graphene.ObjectType):
    questions = graphene.List(Question)
    choices = graphene.List(Choice)

    def resolve_questions(self, info):
        return QuestionModel.objects.all()

    def resolve_choicess(self, info):
        return ChoicesModel.objects.all()

schema = graphene.Schema(query=Query)
