# Generated by Django 3.1.8 on 2021-09-02 16:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("listings", "0010_listing_view_count"),
    ]

    operations = [
        migrations.RenameField(
            model_name="listing",
            old_name="url",
            new_name="application_url",
        ),
        migrations.RenameField(
            model_name="listing",
            old_name="read_more",
            new_name="read_more_url",
        ),
    ]
