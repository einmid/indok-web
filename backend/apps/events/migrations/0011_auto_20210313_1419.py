# Generated by Django 3.1.2 on 2021-03-13 13:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("events", "0010_auto_20210301_1834"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="event",
            name="signed_up_users",
        ),
        migrations.AddField(
            model_name="event",
            name="has_extra_information",
            field=models.BooleanField(default=False),
        ),
        migrations.CreateModel(
            name="SignUp",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                ("timestamp", models.DateTimeField()),
                ("is_attending", models.BooleanField()),
                ("extra_information", models.TextField(blank=True, default="")),
                ("user_email", models.EmailField(max_length=254)),
                ("user_allergies", models.CharField(blank=True, default="", max_length=1000)),
                (
                    "user_phone_number",
                    phonenumber_field.modelfields.PhoneNumberField(max_length=128, region=None),
                ),
                ("user_grade_year", models.IntegerField()),
                (
                    "event",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="events.event"
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
                    ),
                ),
            ],
        ),
    ]
