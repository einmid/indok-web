# Generated by Django 3.1.2 on 2021-03-14 21:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("organizations", "0017_organization_users"),
    ]

    operations = [
        migrations.AlterField(
            model_name="organization",
            name="parent",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="children",
                to="organizations.organization",
            ),
        ),
    ]
