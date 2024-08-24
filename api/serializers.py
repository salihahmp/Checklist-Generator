from rest_framework import serializers
from .models import Checklist

class ChecklistSerializer(serializers.ModelSerializer):
    class Meta:
        model=Checklist
        fields = ('id','code','name','user','take_a_shower','eat_breakfast','go_to_school','play_games','go_to_bed_early','created_at')
 

class CreateChecklistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checklist
        fields =('name','take_a_shower','eat_breakfast','go_to_school','play_games','go_to_bed_early')

