from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

class Question(models.Model):
    CATEGORY_CHOICES = [
        ('general', 'General Knowledge'),
        ('science', 'Science'),
        ('history', 'History'),
    ]

    question = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    correct_answer = models.CharField(max_length=255)
    options = models.JSONField()  # A JSON field to store multiple-choice options.

    def __str__(self):
        return self.question


def user_profile_picture_path(instance, filename):
    """Generate file path for new user profile picture"""
    return f"profile_pictures/{instance.id}/{filename}"


class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  # Unique ID
    email = models.EmailField(unique=True)
    profile_picture = models.ImageField(upload_to=user_profile_picture_path, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    total_score = models.IntegerField(default=0)  # Tracks the user's total score

    def __str__(self):
        return self.username

    
class QuizScore(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="quiz_scores")
    score = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)  # When the quiz was taken

    def __str__(self):
        return f"{self.user.username} - {self.score}"


class Rank(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="rank")
    rank = models.CharField(max_length=50)
    image = models.ImageField(upload_to='rank_images/', null=True, blank=True)  # Rank image
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - Rank: {self.rank}"


class GameRoom(models.Model):
    room_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  # Unique room ID
    name = models.CharField(max_length=100)
    users = models.ManyToManyField(CustomUser, related_name="game_rooms")
    is_active = models.BooleanField(default=True)  # Indicates if the game is active
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
