from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from django.utils.html import strip_tags

from apps.cabins.types import BookingInfoType, AdminTemplateType, UserTemplateType, EmailTypes

user_templates: UserTemplateType = {
    "reserve_subject": "Bekreftelse på mottat søknad om booking av ",
    "decision_subject": "Hyttestyret har tatt stilling til søknaden din om booking av ",
    "reserve_booking": "user_reserve_template.html",
    "approve_booking": "user_approved_template.html",
    "disapprove_booking": "user_disapproved_template.html",
}

admin_templates: AdminTemplateType = {
    "reserve_subject": "Booking av ",
    "reserve_booking": "admin_reserve_template.html",
}


def get_email_subject(booking_info: BookingInfoType, email_type: str, admin: bool) -> str:
    if admin:
        subject = admin_templates["reserve_subject"]
    else:
        subject = (
            user_templates["reserve_subject"] if email_type == "reserve_booking" else user_templates["decision_subject"]
        )

    return subject + booking_info["chosen_cabins_string"]


def send_mail(booking_info: BookingInfoType, email_type: EmailTypes, admin: bool) -> None:
    if admin:
        template = admin_templates["reserve_booking"]
    else:
        template = user_templates[email_type]

    subject = get_email_subject(booking_info, email_type, admin)

    # Display dates with given format in the mail
    content = {
        **booking_info,
        "check_in": booking_info["check_in"].strftime("%d-%m-%Y"),
        "check_out": booking_info["check_out"].strftime("%d-%m-%Y"),
    }

    # HTML content for mail services supporting HTML, text content if HTML isn't supported
    html_content = get_template(template).render(content)
    text_content = strip_tags(html_content)

    email = EmailMultiAlternatives(
        subject,
        body=text_content,
        from_email="noreply@indokntnu.no",
        bcc=[booking_info["receiver_email"]],
    )
    email.attach_alternative(html_content, "text/html")

    # Don't send attachments to admin nor when a booking is disapproved
    if email_type != "disapprove_booking" and not admin:
        email.attach_file("static/cabins/Sjekkliste.pdf")
        email.attach_file("static/cabins/Reglement.pdf")

    email.send()
