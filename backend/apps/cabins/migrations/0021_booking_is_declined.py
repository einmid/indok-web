# Generated by Django 3.2.11 on 2022-02-10 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cabins", "0020_auto_20211111_1825"),
    ]

    operations = [
        migrations.AddField(
            model_name="booking",
            name="is_declined",
            field=models.BooleanField(default=False),
        ),
    ]
