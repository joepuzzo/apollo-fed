from django.urls import path
from django.conf.urls import include, re_path
from rest_framework.routers import DefaultRouter
from . import views
from .views import QuestionViewSet, ChoiceViewSet

router = DefaultRouter()
router.register(r'questions', QuestionViewSet)
router.register(r'choices', ChoiceViewSet)

urlpatterns = [
    path('', views.index, name='index'),
    re_path('^', include(router.urls)),
]
