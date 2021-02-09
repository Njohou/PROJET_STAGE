from rest_framework import serializers
from .models import *
from ..class_management_app.serializers import CourseSerializer, ClassSerializer


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'


class TeacherSerializer(serializers.ModelSerializer):
    admin = AdminSerializer()

    class Meta:
        model = Teacher
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):
    admin = AdminSerializer()
    classes = ClassSerializer()
    course = CourseSerializer()

    class Meta:
        model = Student
        fields = '__all__'
