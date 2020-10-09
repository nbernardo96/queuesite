from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets          
from .serializers import BusinessCardFormSerializer 
from .serializers import FlyerFormSerializer      
from .models import BusinessCardForm                     
from .models import FlyerForm                     

class BusinessCardFormView(viewsets.ModelViewSet):       
  serializer_class = BusinessCardFormSerializer          
  queryset = BusinessCardForm.objects.all()  

class FlyerFormView(viewsets.ModelViewSet):       
  serializer_class = FlyerFormSerializer          
  queryset = FlyerForm.objects.all()  
 
    