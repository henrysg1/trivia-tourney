from django.urls import path
from .views import QuestionListView, UserRegistrationView

urlpatterns = [
    path('questions/', QuestionListView.as_view(), name='questions'),
    path('register/', UserRegistrationView.as_view(), name='register'),
]
