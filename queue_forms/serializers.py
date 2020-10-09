from rest_framework import serializers
from .models import BusinessCardForm
from .models import FlyerForm


class BusinessCardFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessCardForm 
        fields = ('id', 'name', 'title', 'fax', 'direct', 'office', 'email', 'address', 'submitted_on')

class FlyerFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlyerForm 
        fields = ('id','name', 'phone', 'payable_check', 'submitted_on')
