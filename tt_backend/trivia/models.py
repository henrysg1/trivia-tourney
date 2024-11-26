from django.db import models

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

