# Generated by Django 3.1.1 on 2020-10-15 15:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('archive', '0010_auto_20201008_1500'),
    ]

    operations = [
        migrations.RenameField(
            model_name='archivedocument',
            old_name='fileLocation',
            new_name='file_location',
        ),
        migrations.RenameField(
            model_name='archivedocument',
            old_name='typeDoc',
            new_name='type_doc',
        ),
    ]
