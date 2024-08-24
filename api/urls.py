from django.urls import path
from .views import ChecklistView, CreateChecklistView,GetChecklist

urlpatterns = [
    path('checklist', ChecklistView.as_view()),
    path('create-checklist', CreateChecklistView.as_view()),
    path('get-checklist',GetChecklist.as_view())
]