# Generated by Django 3.1.2 on 2021-02-15 17:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0002_user_feide_userid"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="id_token",
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]
