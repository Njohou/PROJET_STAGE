from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Admin(User):
    tel = models.PositiveIntegerField()
    clear_password = models.CharField(max_length=255)

    def __str__(self):
        return self.username


class Teacher(User):
    tel = models.PositiveIntegerField()
    gender = models.CharField(max_length=1)
    is_active = models.BooleanField
    is_staff = models.BooleanField
    is_superuser = models.BooleanField
    clear_password = models.CharField(max_length=255)
    my_admin = models.ForeignKey(Admin, on_delete=models.CASCADE)

    def __str__(self):
        return self.username


class Course(models.Model):
    entitled = models.CharField(max_length=255)
    coefficient = models.IntegerField()
    my_admin = models.ForeignKey(Admin, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)

    # teacher = models.ManyToManyField(Teacher, blank=True)

    def __str__(self):
        return self.entitled


class Class(models.Model):
    level = models.CharField(max_length=255)
    class_number = models.IntegerField(blank=True)
    option = models.CharField(max_length=10, null=True, blank=True)
    serie = models.CharField(max_length=5, null=True, blank=True)
    my_admin = models.ForeignKey(Admin, on_delete=models.CASCADE)
    courses = models.ManyToManyField(Course, blank=True)
    teacher = models.ManyToManyField(Teacher, blank=True)

    def __str__(self):
        return f"{self.level}  {self.class_number}  {self.option} {self.serie}"


class Student(User):
    tel = models.PositiveIntegerField()
    dateOfBirth = models.DateField()
    gender = models.CharField(max_length=1)
    regis_number = models.CharField(max_length=255)
    clear_password = models.CharField(max_length=255)
    my_admin = models.ForeignKey(Admin, on_delete=models.CASCADE)
    my_class = models.ForeignKey(Class, on_delete=models.CASCADE)
    courses = models.ManyToManyField(Course, through='Evaluation', through_fields=('student', 'course'), )

    def __str__(self):
        return self.username


class Evaluation(models.Model):
    eval_date = models.DateField()
    note = models.DecimalField(decimal_places=4, max_digits=8)
    sequence = models.CharField(max_length=250)
    created_at = models.DateTimeField(auto_now_add=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="student")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="course")

    def __str__(self):
        return self.note


class Chapter(models.Model):
    entitled = models.CharField(max_length=255)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    def __str__(self):
        return self.entitled


class Quiz(models.Model):
    entitled = models.CharField(max_length=255)
    course = models.CharField(max_length=255)
    req_time = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    classe = models.ForeignKey(Class, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    student = models.ManyToManyField(Student, through='QuizTaker',
                                     through_fields=('associated_quiz', 'associated_student'), )

    @property
    def questions(self):
        return self.question_set.all()

    def __str__(self):
        return self.entitled


class QuizTaker(models.Model):
    score = models.PositiveIntegerField(default=0)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    associated_student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="ass_student")
    associated_quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="ass_quiz")

    def __str__(self):
        return f"{self.associated_student}  {self.associated_quiz}  {self.score}"


class Question(models.Model):
    question_desc = models.TextField()
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)

    @property
    def answers(self):
        return self.answer_set.all()

    def __str__(self):
        return self.question_desc


class Answer(models.Model):
    answer = models.CharField(max_length=255)
    is_true = models.BooleanField(default=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    def __str__(self):
        return self.answer


class Notification(models.Model):
    message = models.CharField(max_length=255)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name="ass_teacher")
    classe = models.ForeignKey(Class, on_delete=models.CASCADE, related_name="ass_class")
    is_checked = models.BooleanField(default=False)
