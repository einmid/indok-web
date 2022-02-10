# Generated by Django 3.2.5 on 2021-10-04 16:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("events", "0021_auto_20211002_1716"),
    ]

    operations = [
        migrations.AlterField(
            model_name="attendable",
            name="event",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE, related_name="attendable", to="events.event"
            ),
        ),
    ]