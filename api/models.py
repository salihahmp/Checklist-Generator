from django.db import models
import string 
import random

def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase,k=length))
        if Checklist.objects.filter(code=code).count()==0 :
            break
    
    return code

# Create your models here.
class Checklist(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    name = models.CharField(max_length=50)
    user = models.CharField(max_length=50, unique=True)
    take_a_shower = models.BooleanField(null=False, default=False)
    eat_breakfast = models.BooleanField(null=False, default=False)
    go_to_school = models.BooleanField(null=False, default=False)
    play_games = models.BooleanField(null=False, default=False)
    go_to_bed_early = models.BooleanField(null=False, default=False)
    created_at = models.DateTimeField(auto_now_add=True)