from django.db import models
from icc_intership_project.user_app.models import Teacher, Student


# Create your models here.
class Quiz(models.Model):
    entitled = models.CharField(max_length=255)
    req_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    student = models.ManyToManyField(Student, through='QuizTaker',
                                     through_fields=('associated_quiz', 'associated_student'), )

    def __str__(self):
        return self.entitled


class QuizTaker(models.Model):
    score = models.PositiveIntegerField(default=0)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    associated_student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="ass_student")
    associated_quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="ass_quiz")

    def __str__(self):
        return self.score


class Question(models.Model):
    question_desc = models.TextField()
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)

    def __str__(self):
        return self.question_desc


class Answer(models.Model):
    answer = models.CharField(max_length=255)
    is_true = models.BooleanField(default=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    def __str__(self):
        return self.answer
