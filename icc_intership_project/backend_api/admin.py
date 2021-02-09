from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register((Admin, Teacher, Student, Class, Course, Chapter, Quiz, Question, Answer, Evaluation,))