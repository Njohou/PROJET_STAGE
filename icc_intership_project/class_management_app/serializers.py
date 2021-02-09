from .models import *
from rest_framework import serializers
from ..user_app.serializers import AdminSerializer, TeacherSerializer, StudentSerializer


class CourseSerializer(serializers.ModelSerializer):
    admin = AdminSerializer
    teacher = TeacherSerializer

    class Meta:
        model = Course
        fields = '__all__'


class ClassSerializer(serializers.ModelSerializer):
    admin = AdminSerializer()
    course = CourseSerializer()
    teacher = TeacherSerializer()

    class Meta:
        model = Class
        fields = '__all__'


class EvaluationSerializer(serializers.ModelSerializer):
    course = CourseSerializer()
    student = StudentSerializer()

    class Meta:
        model = Evaluation
        fields = '__all__'


class ChapterSerializer(serializers.ModelSerializer):
    course = CourseSerializer()

    class Meta:
        model = Chapter
        fields = '__all__'
