# Generated by Django 2.2.10 on 2020-09-29 22:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('queue_forms', '0004_auto_20200929_2125'),
    ]

    operations = [
        migrations.AlterField(
            model_name='form',
            name='email',
            field=models.CharField(max_length=240, unique=True),
        ),
        migrations.AlterField(
            model_name='form',
            name='fax',
            field=models.CharField(blank=True, max_length=20),
        ),
    ]