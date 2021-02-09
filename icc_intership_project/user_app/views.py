from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from ..user_app.serializers import *

# Create your views here.


class UserView(ModelViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()
