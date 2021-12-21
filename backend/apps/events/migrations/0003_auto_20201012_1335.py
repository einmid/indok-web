# Generated by Django 3.1.1 on 2020-10-12 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("events", "0002_auto_20201005_1433"),
    ]

    operations = [
        migrations.AlterModelOptions(name="category", options={"verbose_name_plural": "Categories"},),
        migrations.AlterField(
            model_name="event", name="location", field=models.CharField(blank=True, default="", max_length=128),
        ),
        migrations.AlterField(model_name="event", name="publisher", field=models.CharField(max_length=128),),
    ]
