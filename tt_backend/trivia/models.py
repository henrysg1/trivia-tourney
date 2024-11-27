from django.db import models
from django.contrib.auth.models import AbstractUser

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

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.username
