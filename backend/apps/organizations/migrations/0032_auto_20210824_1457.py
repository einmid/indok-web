# Generated by Django 3.1.8 on 2021-08-24 12:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("permissions", "0005_auto_20210824_1446"),
        ("organizations", "0031_auto_20210824_1446"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="organization",
            name="hr_group",
        ),
        migrations.RemoveField(
            model_name="organization",
            name="primary_group",
        ),
    ]