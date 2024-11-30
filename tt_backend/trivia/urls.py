from django.urls import path
from .views import QuestionListView, UserRegistrationView, AddQuizScoreView
from trivia.views import CustomTokenObtainPairView, UserDetailView

urlpatterns = [
    path('questions/', QuestionListView.as_view(), name='questions'),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/', UserDetailView.as_view(), name='user-detail'),
    path('add-score/', AddQuizScoreView.as_view(), name='add-score'),
]
