# Generated by Django 3.1.6 on 2021-04-08 15:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("forms", "0001_initial"),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name="answer",
            name="forms.unique_answer_to_question_per_user",
        ),
        migrations.RemoveConstraint(
            model_name="answer",
            name="forms.answer_not_empty",
        ),
        migrations.RemoveConstraint(
            model_name="response",
            name="forms.only_one_response_per_form",
        ),
        migrations.AddConstraint(
            model_name="answer",
            constraint=models.UniqueConstraint(
                fields=("user", "question"), name="unique_answer_to_question_per_user"
            ),
        ),
        migrations.AddConstraint(
            model_name="answer",
            constraint=models.CheckConstraint(
                check=models.Q(_negated=True, answer=""), name="answer_not_empty"
            ),
        ),
        migrations.AddConstraint(
            model_name="response",
            constraint=models.UniqueConstraint(
                fields=("respondent", "form"), name="only_one_response_per_form"
            ),
        ),
    ]
