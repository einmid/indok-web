# Generated by Django 3.1.2 on 2021-02-09 11:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("archive", "0009_auto_20210204_1946"),
    ]

    operations = [
        migrations.AlterField(
            model_name="archivedocument",
            name="year",
            field=models.PositiveSmallIntegerField(blank=True, null=True),
        ),
    ]
