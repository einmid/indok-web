# Generated by Django 3.2.12 on 2022-04-25 16:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cabins", "0026_auto_20220311_1026"),
    ]

    operations = [
        migrations.AlterField(
            model_name="cabin",
            name="external_price",
            field=models.PositiveIntegerField(default=2700),
        ),
        migrations.AlterField(
            model_name="cabin",
            name="internal_price",
            field=models.PositiveIntegerField(default=1100),
        ),
        migrations.AlterField(
            model_name="cabin",
            name="max_guests",
            field=models.PositiveIntegerField(default=18),
        ),
    ]
