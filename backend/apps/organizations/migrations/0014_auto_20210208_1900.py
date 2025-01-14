# Generated by Django 3.1.2 on 2021-02-08 18:00

from django.db import migrations
from django.utils.text import slugify


def slugify_missing_organizations(apps, schema_editor):
    Organization = apps.get_model("organizations", "Organization")
    for organization in Organization.objects.all():
        if not organization.slug:
            organization.slug = slugify(organization.name)
            organization.save()


class Migration(migrations.Migration):

    dependencies = [
        ("organizations", "0013_auto_20210208_1758"),
    ]

    operations = [migrations.RunPython(slugify_missing_organizations)]
