# Generated by Django 3.1.8 on 2021-09-29 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cabins", "0015_auto_20210923_1930"),
    ]

    operations = [
        migrations.CreateModel(
            name="BookingResponsible",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("first_name", models.CharField(max_length=100)),
                ("last_name", models.CharField(max_length=100)),
                ("phone", models.CharField(max_length=8)),
                ("email", models.EmailField(max_length=100)),
                ("active", models.BooleanField(default=False)),
            ],
        ),
        migrations.AlterModelOptions(
            name="booking",
            options={"permissions": [("send_email", "Can send email")]},
        ),
        migrations.AlterField(
            model_name="booking",
            name="receiver_email",
            field=models.EmailField(max_length=100),
        ),
    ]
