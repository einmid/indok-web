# Generated by Django 3.1.8 on 2021-09-02 18:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("forms", "0006_auto_20210729_1247"),
    ]

    operations = [
        migrations.AddConstraint(
            model_name="answer",
            constraint=models.UniqueConstraint(
                fields=("response", "question"), name="unique_answer_per_response"
            ),
        ),
    ]
