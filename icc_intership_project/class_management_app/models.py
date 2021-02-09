from django.db import models
from icc_intership_project.user_app.models import Admin, Teacher, Student


# Create your models here.
class Course(models.Model):
    entitled = models.CharField(max_length=255)
    coefficient = models.IntegerField()
    admin = models.ForeignKey(Admin, on_delete=models.CASCADE)
    teacher = models.ManyToManyField(Teacher)


class Class(models.Model):
    level = models.CharField(max_length=255)
    class_number = models.IntegerField(null=True)
    option = models.CharField(max_length=10, null=True)
    serie = models.CharField(max_length=5, null=True)
    admin = models.ForeignKey(Admin, on_delete=models.CASCADE)
    courses = models.ManyToManyField(Course)
    teacher = models.ManyToManyField(Teacher)

    def __str__(self):
        return f"{self.entitled}  {self.class_number}  {self.option} {self.serie}"


class Evaluation(models.Model):
    eval_date = models.DateField()
    note = models.DecimalField(decimal_places=4, max_digits=8)
    created_at = models.DateTimeField(auto_now_add=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="student")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="course")

    def __str__(self):
        return self.note


class Chapter(models.Model):
    entitled = models.CharField(max_length=255)
    text = models.TextField()
    created_at = models.DateTimeField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    def __str__(self):
        return self.entitled
