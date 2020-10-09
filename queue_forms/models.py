import datetime

from django.db import models
from django.utils import timezone

class BusinessCardForm(models.Model):
    name = models.CharField("Name", max_length=240)
    title = models.CharField(max_length=240)
    fax = models.CharField(max_length=20, blank=True)
    direct = models.CharField("Direct Number", max_length=20)
    office = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    address = models.CharField(max_length=240)
    submitted_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    def was_submitted_recently(self):
        return self.formSubmissionDate >= timezone.now() - datetime.timedelta(days=1)
    def clean_email(self):
        email_passed = self.cleaned_data.get('email')
        return email_passed

class FlyerForm(models.Model):
    name = models.CharField("Name", max_length=240)
    phone = models.CharField("Phone", max_length=20)
    payable_check = models.CharField("PayableCheckToLSA", max_length=240, blank=True)
    submitted_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    def was_submitted_recently(self):
        return self.submitted_on >= timezone.now() - datetime.timedelta(days=1)
