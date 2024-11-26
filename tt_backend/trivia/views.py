from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Question
from .serializers import QuestionSerializer

class QuestionListView(APIView):
    def get(self, request):
        category = request.query_params.get('category', None)
        if category:
            questions = Question.objects.filter(category=category)
        else:
            questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
