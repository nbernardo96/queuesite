# Generated by Django 2.2.10 on 2020-10-02 07:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('queue_forms', '0010_auto_20201002_0702'),
    ]

    operations = [
        migrations.RenameField(
            model_name='flyerform',
            old_name='check',
            new_name='payable_check',
        ),
    ]
