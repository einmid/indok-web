# Generated by Django 3.1.8 on 2021-04-26 16:02

from django.db import migrations, models
import django.db.models.deletion


def set_primary_groups(apps, schema_editor):
    Organization = apps.get_model("organizations", "Organization")
    ResponsibleGroup = apps.get_model("permissions", "ResponsibleGroup")

    for organization in Organization.objects.all():
        created = False
        if organization.primary_group is None:
            primary_group = ResponsibleGroup.objects.create(
                name=organization.name, description=f"Medlemmer av {organization.name}"
            )
            organization.primary_group = primary_group
            created = True
        if organization.hr_group is None:
            hr_group = ResponsibleGroup.objects.create(
                name="HR", description=f"HR-gruppen til {organization.name}. Tillatelser for å se og behandle søknader."
            )
            organization.hr_group = hr_group
            created = True

        if created:
            organization.save()


class Migration(migrations.Migration):

    dependencies = [
        ("permissions", "0002_auto_20210422_2020"),
        ("organizations", "0025_auto_20210426_1735"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="organization",
            name="groups",
        ),
        migrations.AddField(
            model_name="organization",
            name="hr_group",
            field=models.OneToOneField(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="hr_organization",
                to="permissions.responsiblegroup",
            ),
        ),
        migrations.AlterField(
            model_name="organization",
            name="primary_group",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="organization",
                to="permissions.responsiblegroup",
            ),
        ),
        migrations.RunPython(set_primary_groups, lambda apps, schema_editor: None),
    ]
