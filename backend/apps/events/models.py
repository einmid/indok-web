from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models
from multiselectfield import MultiSelectField
from phonenumber_field.modelfields import PhoneNumberField

from apps.ecommerce.models import Product
from apps.organizations.models import Organization


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        # Add verbose name
        verbose_name_plural = "Categories"


class Event(models.Model):
    # Mandatory fields
    title = models.CharField(max_length=128)
    description = models.TextField()
    start_time = models.DateTimeField()
    is_attendable = models.BooleanField()
    publisher = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
    )

    # Optional fields
    end_time = models.DateTimeField(blank=True, null=True)
    location = models.CharField(max_length=128, blank=True, null=True)
    organization = models.ForeignKey(
        Organization, on_delete=models.CASCADE, related_name="events"
    )
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, blank=True, null=True
    )
    image = models.URLField(blank=True, null=True)

    deadline = models.DateTimeField(blank=True, null=True)  # Deadline for signing up

    signup_open_date = models.DateTimeField(
        blank=True, null=True
    )  # When the signup should become available

    available_slots = models.PositiveIntegerField(  # maximal number of users that can sign up for an event
        blank=True,
        null=True,  # TODO: Make this field conditionally required when is_attendable is True!
    )

    price = models.FloatField(blank=True, null=True)

    short_description = models.CharField(max_length=100, blank=True, null=True)

    has_extra_information = models.BooleanField(default=False)

    contact_email = models.EmailField(blank=True, default="")

    binding_signup = models.BooleanField(
        default=False
    )  # Disables sign-off from users_attending if true

    GRADE_CHOICES = ((1, "1"), (2, "2"), (3, "3"), (4, "4"), (5, "5"))
    allowed_grade_years = MultiSelectField(choices=GRADE_CHOICES, default="1,2,3,4,5")

    @property
    def signed_up_users(self):
        return (
            get_user_model()
            .objects.filter(signup__event=self.id, signup__is_attending=True)
            .order_by("signup__timestamp")
        )

    @property
    def users_on_waiting_list(self):
        result = []
        if (
            self.is_attendable
            and self.available_slots is not None
            and self.signed_up_users.count() > self.available_slots
        ):
            result = list(self.signed_up_users.all()[self.available_slots :])
        return result

    @property
    def users_attending(self):
        if self.is_attendable and self.available_slots is not None:
            return list(self.signed_up_users.all()[: self.available_slots])
        return []

    @property
    def is_full(self):
        if self.is_attendable and self.available_slots is not None:
            return self.signed_up_users.count() >= self.available_slots
        return False

    def __str__(self):
        return self.title

    @property
    def ticket_product_id(self):
        if self.price is None:
            return None
        try:
            return Product.objects.get(
                name=f"Billett til {self.title}", organization=self.organization
            ).id
        except Product.DoesNotExist:
            return None


class SignUp(models.Model):
    """
    Intermediary model between users and events representing a single sign up.
    The signups for an event represent users that are attending and those on the waiting list.
    Attending lists and waiting lists are inferred based on the signups and the set available slots.
    If a user sings off (meld av), a new row is added if they sign up again.
    For history's sake, old rows are kept upon sign-off, but is_attending is set to False.
    """

    timestamp = models.DateTimeField()
    is_attending = models.BooleanField()
    extra_information = models.TextField(blank=True, default="")

    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    user_email = models.EmailField()
    user_allergies = models.CharField(max_length=1000, blank=True, default="")
    user_phone_number = PhoneNumberField()
    user_grade_year = models.IntegerField()

    def __str__(self):
        return f"{self.user.username}-{self.event.title}"
