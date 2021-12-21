# Generated by Django 3.2.5 on 2021-10-02 14:53

from django.db import migrations


def restructure_existing_attendable_events(apps, schema_editor):
    attendable_model = apps.get_model("events", "Attendable")
    slot_distribution_model = apps.get_model("events", "SlotDistribution")
    event_model = apps.get_model("events", "Event")

    existing_attendable_events = event_model.objects.filter(is_attendable=True)

    for event in existing_attendable_events:
        if event.signup_open_date is None:
            setattr(event, "signup_open_date", event.start_time)
        if event.available_slots is None:
            setattr(event, "available_slots", 0)

        attendable = attendable_model.objects.create(
            event=event,
            signup_open_date=event.signup_open_date,
            deadline=event.deadline,
            price=event.price,
            binding_signup=event.binding_signup,
        )

        slot_distribution_model.objects.create(
            attendable=attendable, available_slots=event.available_slots, grade_years=event.allowed_grade_years,
        )


class Migration(migrations.Migration):

    dependencies = [
        ("events", "0019_attendable_slotdistribution"),
    ]

    operations = [migrations.RunPython(restructure_existing_attendable_events, migrations.RunPython.noop)]
