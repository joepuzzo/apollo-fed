from graphene_django import DjangoObjectType
from .models import Question as QuestionModel, Choice as ChoiceModel
#from rest_framework.permissions import AllowAny
#from django.views.decorators.csrf import csrf_exempt
import graphene

class Question(DjangoObjectType):
    class Meta:
        model = QuestionModel
        #permission_classes = [AllowAny]

class Choice(DjangoObjectType):
    class Meta:
        model = ChoiceModel
        #permission_classes = [AllowAny]

class Query(graphene.ObjectType):
    questions = graphene.List(Question)
    choices = graphene.List(Choice)

    def resolve_questions(self, info):
        return QuestionModel.objects.all()

    def resolve_choicess(self, info):
        return ChoicesModel.objects.all()

schema = graphene.Schema(query=Query)
