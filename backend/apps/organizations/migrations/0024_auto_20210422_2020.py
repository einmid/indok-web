# Generated by Django 3.1.8 on 2021-04-22 18:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("permissions", "0002_auto_20210422_2020"),
        ("organizations", "0023_auto_20210422_2018"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="organization",
            name="responsible_group",
        ),
        migrations.AddField(
            model_name="organization",
            name="groups",
            field=models.ManyToManyField(
                related_name="organizations", to="permissions.ResponsibleGroup"
            ),
        ),
        migrations.AddField(
            model_name="organization",
            name="primary_group",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                to="permissions.responsiblegroup",
                null=True,
            ),
        ),
    ]
