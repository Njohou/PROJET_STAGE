from rest_framework import filters
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from gtts import gTTS
import os
from mutagen.mp3 import MP3

from .permissions import IsStaff, IsAdmin
from .serializers import *


# Create your views here.


# user
class UserView(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    # permission_classes = (IsAuthenticated,)

    def get_permissions(self):
        if self.request.method == 'POST' or self.request.method == 'DELETE' \
                or self.request.method == 'PUT' or self.request.method == 'GET':
            self.permission_classes = [IsAdmin]
        return super(UserView, self).get_permissions()


class AdminView(ModelViewSet):
    serializer_class = AdminSerializer
    queryset = Admin.objects.all()

    # permission_classes = (IsAuthenticated,)

    def get_permissions(self):
        if self.request.method == 'POST' or self.request.method == 'DELETE' \
                or self.request.method == 'PUT' or self.request.method == 'GET':
            self.permission_classes = [IsAdmin]
        return super(AdminView, self).get_permissions()


class TeacherView(ModelViewSet):
    serializer_class = TeacherSerializer
    queryset = Teacher.objects.all()

    # permission_classes = (IsAuthenticated,)
    def get_permissions(self):
        if self.request.method == 'POST' or self.request.method == 'DELETE' or self.request.method == 'PUT':
            self.permission_classes = [IsAdmin]
        return super(TeacherView, self).get_permissions()

    def destroy(self, request, *args, **kwargs):
        super(TeacherView, self).destroy(request)
        return Response("This teacher data has been deleted.")


class StudentView(ModelViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()

    # permission_classes = (IsAuthenticated,)

    def get_permissions(self):
        if self.request.method == 'POST' or self.request.method == 'DELETE' or self.request.method == 'PUT':
            self.permission_classes = [IsStaff]
        return super(StudentView, self).get_permissions()

    def destroy(self, request, *args, **kwargs):
        super(StudentView, self).destroy(request)
        return Response("This student data has been deleted.")


# class management
class CourseView(ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()

    # permission_classes = (IsAuthenticated,)

    def get_permissions(self):
        if self.request.method == 'POST' or self.request.method == 'DELETE' or self.request.method == 'PUT':
            self.permission_classes = [IsAdmin]
        return super(CourseView, self).get_permissions()


class ClassView(ModelViewSet):
    serializer_class = ClassSerializer
    queryset = Class.objects.all()

    # permission_classes = (AllowAny,)

    def get_permissions(self):
        if self.request.method == 'POST' or self.request.method == 'DELETE' or self.request.method == 'PUT':
            self.permission_classes = [IsAdmin]
        return super(ClassView, self).get_permissions()

    def destroy(self, request, *args, **kwargs):
        super(ClassView, self).destroy(request)
        return Response("This class data has been deleted.")


class ChapterView(ModelViewSet):
    serializer_class = ChapterSerializer
    queryset = Chapter.objects.all()

    # permission_classes = (IsAuthenticated,)

    def get_permissions(self):
        if self.request.method == 'POST' or self.request.method == 'DELETE' or self.request.method == 'PUT':
            self.permission_classes = [IsStaff]
        return super(ChapterView, self).get_permissions()

    def destroy(self, request, *args, **kwargs):
        super(ChapterView, self).destroy(request)
        return Response("This chapter has been deleted.")


class EvaluationView(ModelViewSet):
    serializer_class = EvaluationSerializer
    queryset = Evaluation.objects.all()

    # permission_classes = (IsAuthenticated,)

    def get_permissions(self):
        if self.request.method == 'POST' or self.request.method == 'DELETE' or self.request.method == 'PUT':
            self.permission_classes = [IsStaff]
        return super(EvaluationView, self).get_permissions()


# Quiz management
class QuizView(ModelViewSet):
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()
    filter_backends = [filters.OrderingFilter]
    ordering = ['course']

    # permission_classes = (IsAuthenticated,)

    def get_permissions(self):
        if self.request.method == 'POST' or self.request.method == 'DELETE' or self.request.method == 'PUT':
            self.permission_classes = [IsStaff]
        return super(QuizView, self).get_permissions()

    def destroy(self, request, *args, **kwargs):
        super(QuizView, self).destroy(request)
        return Response("This quiz has been deleted.")


class QuizTakerView(ModelViewSet):
    serializer_class = QuizTakerSerializer
    queryset = QuizTaker.objects.all()
    permission_classes = (IsAuthenticated,)


class QuestionView(ModelViewSet):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()

    # permission_classes = (IsAuthenticated,)

    def get_permissions(self):
        if self.request.method == 'POST' or self.request.method == 'DELETE' or self.request.method == 'PUT':
            self.permission_classes = [IsStaff]
        return super(QuestionView, self).get_permissions()
    # lookup_field = 'id'
    #
    # @action(detail=True, methods=["GET"])
    # def choices(self, request, id=None):
    #     question = self.get_object()
    #     answers = Answer.objects.filter(question=question)
    #     serializer = AnswerSerializer(answers, many=True)
    #     return Response(serializer.data, status=200)
    #
    # @action(detail=True, methods=["POST"])
    # def choice(self, request, id=None):
    #     question = self.get_object()
    #     data = request.data
    #     data["question"] = question.id
    #     serializer = AnswerSerializer(data=data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=201)
    #     return Response(serializer.erros, status=400)


class AnswerView(ModelViewSet):
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()

    # permission_classes = (IsAuthenticated,)

    def get_permissions(self):
        if self.request.method == 'POST' or self.request.method == 'DELETE' or self.request.method == 'PUT':
            self.permission_classes = [IsStaff]
        return super(AnswerView, self).get_permissions()


class NotificationView(ModelViewSet):
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()
    permission_classes = (IsAuthenticated,)


def jwt_response_payload_handler(token, user=None, request=None):
    """
    Returns the response data for both the login and refresh views.
    Override to return a custom response such as including the
    serialized representation of the User.
    """

    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}, ).data
    }


class AudioView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        mytext = request.data['text']
        username = request.data['username']
        title = request.data['title']
        print(username, title)
        myobj = gTTS(text=mytext, lang="fr", slow=False)
        myobj.save("%s.mp3" % os.path.join(r"media", title + " " + username))
        audio_length = MP3("media/" + title + " " + username + ".mp3")
        # print("---------Taille de l'audio", audio_length.info.length)
        return Response({'url': "http://localhost:8000/media/" + title + " " + username + ".mp3",
                         'taille': audio_length.info.length})
