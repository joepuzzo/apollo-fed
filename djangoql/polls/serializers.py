from rest_framework.serializers import ModelSerializer

from .models import Question, Choice

# Serializers define the API representation.
class QuestionSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = ['question_text', 'pub_date']

class ChoiceSerializer(ModelSerializer):
    class Meta:
        model = Choice
        fields = ['question', 'choice_text', 'votes']
