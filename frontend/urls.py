from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('list', index),
    path('create', index),
    path('list/<str:checklistCode>',index)

]