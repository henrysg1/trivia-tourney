from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import QuizScore, Question
from .serializers import QuestionSerializer, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class QuestionListView(APIView):
    def get(self, request):
        category = request.query_params.get('category', None)
        if category:
            questions = Question.objects.filter(category=category)
        else:
            questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        rank = user.rank if hasattr(user, 'rank') else None  # Handle cases where rank doesn't exist
        return Response({
            "username": user.username,
            "profile_picture": user.profile_picture.url if user.profile_picture else None,
            "rank": {
                "name": rank.rank if rank else "Unranked",
                "image": rank.image.url if rank and rank.image else None,
            } if rank else None,
        })


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['email'] = user.email
        return token

    def validate(self, attrs):
        try:
            user = User.objects.get(email=attrs['username'])  # Use email as username field
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password.")

        attrs['username'] = user.username
        return super().validate(attrs)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class AddQuizScoreView(APIView):
    def post(self, request):
        user = request.user
        score = request.data.get('score')

        if user and score is not None:
            # Create QuizScore record
            QuizScore.objects.create(user=user, score=score)
            
            # Update the user's total score
            user.total_score += int(score)
            user.save()

            return Response({"message": "Score added successfully!"}, status=status.HTTP_201_CREATED)
        return Response({"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)