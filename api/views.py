from django.shortcuts import render
from rest_framework import generics,status
from .serializers import ChecklistSerializer, CreateChecklistSerializer
from .models import Checklist
from rest_framework.views import APIView
from rest_framework.response import Response




# Create your views here.

class ChecklistView(generics.ListAPIView):
    queryset = Checklist.objects.all()
    serializer_class= ChecklistSerializer

class GetChecklist(APIView):
    serializer_class = ChecklistSerializer
    lookup_url_kwarg ='code'

    def get (self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            checklist = Checklist.objects.filter(code=code)
            if len(checklist)>0:
                data=ChecklistSerializer(checklist[0]).data
                data['is_user']=self.request.session.session_key == checklist[0].user
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Checklist Not Found': 'Invalid Checklist Code'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'Bad Request': 'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)

class CreateChecklistView(APIView):
    serializer_class= CreateChecklistSerializer

    def post(self,request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get("name")
            take_a_shower = serializer.data.get("take_a_shower")
            eat_breakfast = serializer.data.get("eat_breakfast")
            go_to_school = serializer.data.get("go_to_school")
            play_games = serializer.data.get("play_games")
            go_to_bed_early = serializer.data.get("go_to_bed_early")
            user = self.request.session.session_key

            queryset = Checklist.objects.filter(user=user, name=name)
            if queryset.exists():
                checklist = queryset[0]
                checklist.take_a_shower = take_a_shower
                checklist.eat_breakfast =eat_breakfast
                checklist.go_to_school = go_to_school
                checklist.play_games =play_games
                checklist.go_to_bed_early =go_to_bed_early

                checklist.save(update_fields=['take_a_shower','eat_breakfast','go_to_school','play_games','go_to_bed_early'])
            
            else:
                checklist=Checklist(user=user,name=name,take_a_shower=take_a_shower,eat_breakfast=eat_breakfast,go_to_school=go_to_school,play_games=play_games,go_to_bed_early=go_to_bed_early)
                checklist.save()
                
            return Response(ChecklistSerializer(checklist).data,status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)






