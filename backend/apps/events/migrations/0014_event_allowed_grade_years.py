# Generated by Django 3.1.2 on 2021-03-14 21:09

from django.db import migrations
import multiselectfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ("events", "0013_auto_20210314_2118"),
    ]

    operations = [
        migrations.AddField(
            model_name="event",
            name="allowed_grade_years",
            field=multiselectfield.db.fields.MultiSelectField(
                choices=[(1, "1"), (2, "2"), (3, "3"), (4, "4"), (5, "5")], default="1,2,3,4,5", max_length=9
            ),
        ),
    ]
