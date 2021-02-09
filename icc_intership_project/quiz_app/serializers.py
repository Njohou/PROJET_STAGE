from .models import *
from rest_framework import serializers

from ..user_app.serializers import TeacherSerializer, StudentSerializer


class QuizSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer()
    student = StudentSerializer()

    class Meta:
        model = Quiz
        fields = '__all__'


class QuizTakerSerializer(serializers.ModelSerializer):
    quiz = QuizSerializer()
    student = StudentSerializer()

    class Meta:
        model = QuizTaker
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    quiz = QuizSerializer()

    class Meta:
        model = Question
        fields = '__all__'


class AnswerSerializer(serializers.ModelSerializer):
    question = QuestionSerializer()

    class Meta:
        model = Answer
        fields = '__all__'
