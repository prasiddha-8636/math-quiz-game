from django.urls import path
from .views import QuestionView, ScoreView

urlpatterns = [
    path('questions', QuestionView.as_view(), name='questions'),
    path('scores', ScoreView.as_view(), name='scores'),
]
