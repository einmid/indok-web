# Generated by Django 3.1.8 on 2021-08-24 13:46

from django.db import migrations
from uuid import UUID


def delete_orphan_groups(apps, _):
    Group = apps.get_model("auth", "Group")
    for group in Group.objects.filter(responsiblegroup=None):
        try:
            # If the group has a valid UUID name and is not connected to a responsiblegroup, it is an orphan and should be killed.
            UUID(group.name)
            group.delete()
        except ValueError:
            continue


class Migration(migrations.Migration):

    dependencies = [
        ("permissions", "0009_auto_20210824_1515"),
    ]

    operations = [migrations.RunPython(delete_orphan_groups, migrations.RunPython.noop)]
