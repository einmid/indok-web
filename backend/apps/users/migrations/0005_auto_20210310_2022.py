# Generated by Django 3.1.2 on 2021-03-10 19:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0004_auto_20210307_2115"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="feide_email",
            field=models.EmailField(blank=True, default="", max_length=254),
        ),
    ]
