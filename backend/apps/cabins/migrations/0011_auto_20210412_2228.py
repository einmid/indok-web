# Generated by Django 3.1.6 on 2021-04-12 20:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cabins", "0010_auto_20210412_2032"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="booking",
            name="price",
        ),
        migrations.AddField(
            model_name="booking",
            name="external_participants",
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="booking",
            name="internal_participants",
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
