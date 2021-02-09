from django.db import models
from django.contrib.auth.models import AbstractUser, User
from icc_intership_project.class_management_app.models import Class, Course


# Create your models here.
class Admin(User):
    email = models.EmailField()
    password = models.CharField(max_length=255)
    tel = models.PositiveIntegerField()


class Teacher(User):
    gender = models.CharField(max_length=1)
    admin = models.ForeignKey(Admin, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Student(AbstractUser):
    dateOfBirth = models.DateField()
    regis_number = models.CharField(max_length=255)
    admin = models.ForeignKey(Admin, on_delete=models.CASCADE)
    my_class = models.ForeignKey(Class, on_delete=models.CASCADE)
    courses = models.ManyToManyField(Course, through='Evaluation', through_fields=('student', 'course'), )

    def __str__(self):
        return self.name
