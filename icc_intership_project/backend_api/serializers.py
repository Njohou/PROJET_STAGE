from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import *
from rest_framework import serializers
# from rest_framework_jwt import views as jwt_views
from rest_framework_jwt import serializers as jwt_serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['id', 'username', 'email', 'password', 'tel', 'is_superuser', 'is_staff', 'is_active']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        print('my validated data', validated_data)
        user = super(AdminSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.clear_password = validated_data['password']
        print('clear password: ', user.clear_password)
        user.save()
        return user


class TeacherSerializer(serializers.ModelSerializer):
    my_admin = AdminSerializer

    class Meta:
        model = Teacher
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'tel', 'gender',
                  'password', 'my_admin', 'is_superuser', 'is_staff', 'is_active']
        # extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        # print('my validated data', validated_data)
        # user = super(TeacherSerializer, self).create(validated_data)
        user = super().create(validated_data)
        print('my validated data', validated_data)
        user.set_password(validated_data['password'])
        user.clear_password = validated_data['password']
        user.save()
        return user

    # def validate(self, data):
    #     print('DATA--------------------', data)
    #     user = Teacher.objects.get(username=data['username'])
    #     if user:
    #         print('--------------------HELLO')
    #         raise serializers.ValidationError('This username already exists !')
    #     else:
    #         print('--------------------HELLO')
    #         return data


class CourseSerializer(serializers.ModelSerializer):
    admin = AdminSerializer
    course_teacher = serializers.SerializerMethodField()
    chapter_list = serializers.SerializerMethodField()
    classes = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = '__all__'

    def get_course_teacher(self, obj):
        return TeacherSerializer(obj.teacher).data

    def get_chapter_list(self, obj):
        return ChapterSerializer(obj.chapter_set.all(), many=True).data

    def get_classes(self, obj):
        return ClassSerializer1(obj.class_set.all(), many=True).data


# class CourseSerializer1(serializers.ModelSerializer):
#     class Meta:
#         model = Course
#         fields = '__all__'
class ClassSerializer1(serializers.ModelSerializer):

    class Meta:
        model = Class
        fields = ['id', 'level', 'class_number', 'option', 'serie']


class StudentSerializer1(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'username', 'regis_number', 'first_name', 'last_name', 'tel', 'gender', 'password',
                  'dateOfBirth', 'is_superuser', 'is_staff', 'is_active', 'my_class', 'my_admin']


class ClassSerializer(serializers.ModelSerializer):
    admin = AdminSerializer
    all_courses = serializers.SerializerMethodField()
    teachers = serializers.SerializerMethodField()
    all_students = serializers.SerializerMethodField()

    class Meta:
        model = Class
        fields = ['id', 'level', 'class_number', 'option', 'serie', 'all_courses',
                  'teachers', 'all_students', 'courses', 'teacher', 'my_admin']

    def validate(self, data):
        classe = Class.objects.filter(level=data['level'], class_number=data['class_number'], serie=data['serie'], option=data['option'])
        if classe:
            raise serializers.ValidationError('This class already exists !')
        # print('------------------DATA', data)
        return data

    def get_all_courses(self, obj):
        # print(obj.courses.all())
        return CourseSerializer(obj.courses.all(), many=True).data

    def get_teachers(self, obj):
        # print(obj.teacher.all())
        return TeacherSerializer(obj.teacher.all(), many=True).data

    def get_all_students(self, obj):
        # print(obj.student_set.all())
        return StudentSerializer1(obj.student_set.all(), many=True).data


class StudentSerializer(serializers.ModelSerializer):
    student_class = serializers.SerializerMethodField()

    class Meta:
        model = Student
        # fields = '__all__'
        fields = ['id', 'username', 'regis_number', 'first_name', 'last_name', 'tel', 'gender', 'password',
                  'dateOfBirth', 'my_class', 'student_class', 'my_admin', 'is_superuser', 'is_staff', 'is_active']
        # extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def get_student_class(self, obj):
        return ClassSerializer(obj.my_class).data

    def create(self, validated_data):
        print('my validated data', validated_data)
        user = super().create(validated_data)
        user.set_password(validated_data['password'])
        user.clear_password = validated_data['password']
        print('clear password: ', user.clear_password)
        user.save()
        return user


class EvaluationSerializer(serializers.ModelSerializer):
    course_note = serializers.SerializerMethodField()
    student_note = serializers.SerializerMethodField()

    class Meta:
        model = Evaluation
        fields = ['id', 'eval_date', 'note', 'sequence', 'student', 'course', 'course_note', 'student_note']

    def get_course_note(self, obj):
        return CourseSerializer(obj.course).data

    def get_student_note(self, obj):
        return StudentSerializer1(obj.student).data


class CourseSerializer1(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class ChapterSerializer(serializers.ModelSerializer):
    courseObj = serializers.SerializerMethodField()

    class Meta:
        model = Chapter
        fields = '__all__'

    def get_courseObj(self, obj):
        return CourseSerializer1(obj.course).data


class AnswerSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Answer
        fields = '__all__'

        read_only_fields = ('question',)


class QuestionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    answers = AnswerSerializer(many=True)

    class Meta:
        model = Question
        fields = ['id', 'question_desc', 'quiz', 'answers']
        read_only_fields = ('quiz',)


class QuizSerializer(serializers.ModelSerializer):
    teacher_details = serializers.SerializerMethodField()
    classe_details = serializers.SerializerMethodField()
    student = StudentSerializer
    # my_course = serializers.SerializerMethodField()

    questions = QuestionSerializer(many=True)

    class Meta:
        model = Quiz
        ordering = ('classe', 'course',)
        fields = ['id', 'entitled', 'course', 'req_time', 'created_at',
                  'classe', 'classe_details', 'teacher', 'teacher_details', 'questions']
        # depth = 1

    def get_teacher_details(self, obj):
        return TeacherSerializer(obj.teacher).data

    def get_classe_details(self, obj):
        return ClassSerializer(obj.classe).data

    # def get_my_course(self, obj):
    #     return CourseSerializer(obj.course).data

    def create(self, validated_data):
        print(validated_data)
        questions = validated_data.pop('questions')
        quiz = Quiz.objects.create(**validated_data)
        for question in questions:
            answers = question.pop('answers')
            question = Question.objects.create(**question, quiz=quiz)
            for answer in answers:
                Answer.objects.create(**answer, question=question)
        return quiz


class QuizTakerSerializer(serializers.ModelSerializer):
    quiz = QuizSerializer
    student = StudentSerializer
    student_details = serializers.SerializerMethodField()
    quiz_details = serializers.SerializerMethodField()

    class Meta:
        model = QuizTaker
        # fields = ['id', 'score', 'start_time', 'end_time', 'student_details', 'quiz_details']
        fields = '__all__'

    def get_student_details(self, obj):
        return StudentSerializer(obj.associated_student).data

    def get_quiz_details(self, obj):
        return QuizSerializer(obj.associated_quiz).data


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['is_superuser'] = user.is_superuser
        return token


class NotificationSerializer(serializers.ModelSerializer):
    teacher_details = serializers.SerializerMethodField()
    classe_details = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = '__all__'

    def get_teacher_details(self, obj):
        return TeacherSerializer(obj.teacher).data

    def get_classe_details(self, obj):
        return ClassSerializer(obj.classe).data
