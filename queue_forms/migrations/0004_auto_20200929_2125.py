# Generated by Django 2.2.10 on 2020-09-29 21:25

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('queue_forms', '0003_auto_20200929_1919'),
    ]

    operations = [
        migrations.AlterField(
            model_name='form',
            name='email',
            field=models.CharField(max_length=200, validators=[django.core.validators.EmailValidator()]),
        ),
    ]