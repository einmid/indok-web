# Generated by Django 3.2.11 on 2022-02-12 11:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0020_auto_20220212_1226'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='available_slots',
        ),
        migrations.RemoveField(
            model_name='event',
            name='binding_signup',
        ),
        migrations.RemoveField(
            model_name='event',
            name='deadline',
        ),
        migrations.RemoveField(
            model_name='event',
            name='has_extra_information',
        ),
        migrations.RemoveField(
            model_name='event',
            name='is_attendable',
        ),
        migrations.RemoveField(
            model_name='event',
            name='price',
        ),
        migrations.RemoveField(
            model_name='event',
            name='signup_open_date',
        ),
        migrations.AlterField(
            model_name='event',
            name='short_description',
            field=models.CharField(default='Klikk her for å lese mer', max_length=100),
        ),
    ]
