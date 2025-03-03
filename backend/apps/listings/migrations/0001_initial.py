# Generated by Django 3.1.6 on 2021-04-08 15:48

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("organizations", "0019_merge_20210315_1439"),
        ("forms", "0002_auto_20210408_1735"),
    ]

    operations = [
        migrations.CreateModel(
            name="Listing",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("description", models.CharField(blank=True, default="", max_length=2000)),
                ("title", models.CharField(max_length=250)),
                ("slug", models.SlugField(allow_unicode=True, blank=True, default="", max_length=255)),
                ("start_datetime", models.DateTimeField(default=django.utils.timezone.now)),
                ("end_datetime", models.DateTimeField()),
                ("deadline", models.DateTimeField()),
                ("url", models.URLField(blank=True, null=True)),
                ("form", models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to="forms.form")),
                (
                    "organization",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="listings",
                        to="organizations.organization",
                    ),
                ),
            ],
        ),
    ]
