# Generated by Django 2.2.10 on 2020-10-02 07:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('queue_forms', '0009_auto_20201002_0659'),
    ]

    operations = [
        migrations.AlterField(
            model_name='flyerform',
            name='check',
            field=models.CharField(blank=True, max_length=240, verbose_name='PayableCheckToLSA'),
        ),
    ]
