# Generated by Django 3.1.8 on 2021-07-29 07:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("forms", "0005_merge_20210526_1851"),
        ("listings", "0006_auto_20210501_1201"),
    ]

    operations = [
        migrations.AlterField(
            model_name="listing",
            name="form",
            field=models.OneToOneField(
                null=True, on_delete=django.db.models.deletion.SET_NULL, to="forms.form"
            ),
        ),
    ]
