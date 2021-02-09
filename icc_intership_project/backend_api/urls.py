from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import *

user_router = DefaultRouter()
class_management_router = DefaultRouter()
quiz_router = DefaultRouter()
audio_router = DefaultRouter()

# user router
user_router.register('admin', AdminView, base_name='admin')
user_router.register('teacher', TeacherView, base_name='teacher')
user_router.register('student', StudentView, base_name='student')
user_router.register('user', UserView, base_name='user')

# class router
class_management_router.register('course', CourseView, base_name='course')
class_management_router.register('class', ClassView, base_name='class')
class_management_router.register('chapter', ChapterView, base_name='chapter')
class_management_router.register('evaluation', EvaluationView, base_name='evaluation')
class_management_router.register('notification', NotificationView, base_name='notification')

# class_management_router.register('course', CourseView, base_name='course')
# class_management_router.register('class', ClassView, base_name='class')
# class_management_router.register('chapter', ChapterView, base_name='chapter')
# class_management_router.register('evaluation', EvaluationView, base_name='evaluation')
# class_management_router.register('course', CourseView, base_name='course')
# class_management_router.register('class', ClassView, base_name='class')
# class_management_router.register('chapter', ChapterView, base_name='chapter')
# class_management_router.register('evaluation', EvaluationView, base_name='evaluation')
# class_management_router.register('notification', NotificationView, base_name='notification')

# quiz router
quiz_router.register('quiz', QuizView, base_name='quiz')
quiz_router.register('question', QuestionView, base_name='question')
quiz_router.register('answer', AnswerView, base_name='answer')
quiz_router.register('quiz_taker', QuizTakerView, base_name='quiz_taker')

# media router
# audio_router.register('media', AudioView, base_name='media')

urlpatterns = [
    path('user/', include(user_router.urls)),
    path('user/<int:pk>/', include(user_router.urls)),
    path('class_management/', include(class_management_router.urls)),
    path('class_management/<int:pk>/', include(class_management_router.urls)),
    path('quiz_management/', include(quiz_router.urls)),
    path('quiz_management/<int:pk>/', include(quiz_router.urls)),

    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('auth/login/', obtain_jwt_token),
    path('auth/refresh/', refresh_jwt_token),
    # path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('audio/', AudioView.as_view()),
]