from django.contrib import admin
from .models import Question

class QuestionAdmin(admin.ModelAdmin):
    list_display = ('question', 'category', 'correct_answer')
    search_fields = ('question', 'category')
    list_filter = ('category',)

# Register with customization
admin.site.register(Question, QuestionAdmin)
