# Generated by Django 3.1.2 on 2021-03-27 11:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cabins", "0008_auto_20210322_2011"),
    ]

    operations = [
        migrations.AlterField(
            model_name="cabin",
            name="max_guests",
            field=models.IntegerField(default=18),
        ),
    ]
