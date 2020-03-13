from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.permissions import AllowAny
from rest_framework import renderers

# Create your views here.

from rest_framework.mixins import (
    CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin
)

from rest_framework.viewsets import GenericViewSet

from .models import Question, Choice

from .serializers import QuestionSerializer, ChoiceSerializer


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

class QuestionViewSet(GenericViewSet,  # generic view functionality
                     CreateModelMixin,  # handles POSTs
                     RetrieveModelMixin,  # handles GETs for 1 Question
                     UpdateModelMixin,  # handles PUTs and PATCHes
                     ListModelMixin):  # handles GETs for many Questions
      permission_classes = [AllowAny]
      renderer_classes = [renderers.JSONRenderer]
      serializer_class = QuestionSerializer
      queryset = Question.objects.all()


class ChoiceViewSet(GenericViewSet,  # generic view functionality
                     CreateModelMixin,  # handles POSTs
                     RetrieveModelMixin,  # handles GETs for 1 Choice
                     UpdateModelMixin,  # handles PUTs and PATCHes
                     ListModelMixin):  # handles GETs for many Choices

      permission_classes = [AllowAny]
      renderer_classes = [renderers.JSONRenderer]
      serializer_class = ChoiceSerializer
      queryset = Choice.objects.all()
