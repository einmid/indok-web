# Generated by Django 3.2.5 on 2021-09-09 16:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("organizations", "0030_auto_20210426_2129"),
    ]

    operations = [
        migrations.AlterField(
            model_name="membership",
            name="id",
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID"),
        ),
        migrations.AlterField(
            model_name="organization",
            name="id",
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID"),
        ),
    ]
