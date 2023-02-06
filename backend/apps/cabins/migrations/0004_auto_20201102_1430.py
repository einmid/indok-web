# Generated by Django 3.1.1 on 2020-11-02 14:30

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("cabins", "0003_booking_price"),
    ]

    operations = [
        migrations.RenameField(
            model_name="booking",
            old_name="end_day",
            new_name="bookFrom",
        ),
        migrations.RenameField(
            model_name="booking",
            old_name="start_day",
            new_name="bookTo",
        ),
        migrations.RenameField(
            model_name="booking",
            old_name="contact_num",
            new_name="phone",
        ),
        migrations.RemoveField(
            model_name="booking",
            name="contact_person",
        ),
        migrations.AddField(
            model_name="booking",
            name="firstname",
            field=models.CharField(default=0, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="booking",
            name="receiverEmail",
            field=models.CharField(default=0, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="booking",
            name="surname",
            field=models.CharField(default=0, max_length=100),
            preserve_default=False,
        ),
    ]
