from django.contrib import admin

from .models import BusinessCardForm
from .models import FlyerForm

admin.site.register(BusinessCardForm)
admin.site.register(FlyerForm)
