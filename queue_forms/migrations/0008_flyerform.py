# Generated by Django 2.2.10 on 2020-10-01 20:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('queue_forms', '0007_auto_20201001_2039'),
    ]

    operations = [
        migrations.CreateModel(
            name='FlyerForm',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=240, verbose_name='Name')),
                ('phone', models.CharField(max_length=20, verbose_name='Phone')),
                ('check', models.CharField(max_length=240, verbose_name='PayableCheckToLSA')),
                ('formSubmissionDate', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]