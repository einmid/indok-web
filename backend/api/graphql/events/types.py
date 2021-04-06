import graphene
from apps.ecommerce.models import Order
from apps.events.models import Category, Event, SignUp
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required

from ..users.types import UserType


class UserAttendingType(graphene.ObjectType):
    is_signed_up = graphene.Boolean()
    is_on_waiting_list = graphene.Boolean()
    has_bought_ticket = graphene.Boolean()


class EventType(DjangoObjectType):
    user_attendance = graphene.Field(UserAttendingType)
    is_full = graphene.Boolean(source="is_full")
    users_on_waiting_list = graphene.List(UserType)
    users_attending = graphene.List(UserType)
    allowed_grade_years = graphene.List(graphene.Int)
    available_slots = graphene.Int()
    ticket_product_id = graphene.ID(source="ticket_product_id")

    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "start_time",
            "end_time",
            "location",
            "description",
            "organization",
            "category",
            "image",
            "is_attendable",
            "deadline",
            "publisher",
            "price",
            "signup_open_date",
            "short_description",
            "has_extra_information",
            "binding_signup",
            "contact_email",
        ]

    class PermissionDecorators:
        @staticmethod
        def is_in_event_organization(resolver):
            def wrapper(event: Event, info):
                user = info.context.user
                if (
                    user.memberships.filter(organization=event.organization).exists()
                    or user.is_superuser
                ):
                    return resolver(event, info)
                else:
                    raise PermissionError(
                        f"Du må være medlem av organisasjonen {event.organization.name} for å gjøre dette kallet"
                    )

            return wrapper

    @staticmethod
    def resolve_user_attendance(event, info):
        user = info.context.user
        return {
            "is_signed_up": user in event.users_attending,
            "is_on_waiting_list": user in event.users_on_waiting_list,
            "has_bought_ticket": Order.objects.filter(
                product__id=event.ticket_product_id,
                user=user,
                payment_status__in=[
                    Order.PaymentStatus.RESERVED,
                    Order.PaymentStatus.CAPTURED,
                ],
            ).exists()
            if event.ticket_product_id is not None
            else False,
        }

    @staticmethod
    def resolve_allowed_grade_years(event, info):
        return [int(grade) for grade in event.allowed_grade_years]

    @staticmethod
    @login_required
    @PermissionDecorators.is_in_event_organization
    def resolve_users_on_waiting_list(event, info):
        return event.users_on_waiting_list

    @staticmethod
    @login_required
    @PermissionDecorators.is_in_event_organization
    def resolve_users_attending(event, info):
        return event.users_attending

    @staticmethod
    def resolve_available_slots(event, info):
        user = info.context.user
        if (
            not user.is_authenticated
            or not user.memberships.filter(organization=event.organization).exists()
        ):
            return None
        return event.available_slots


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = [
            "id",
            "name",
        ]


class SignUpType(DjangoObjectType):
    class Meta:
        model = SignUp
        fields = [
            "id",
            "event",
            "user",
            "timestamp",
            "is_attending",
            "extra_information",
            "user_email",
            "user_allergies",
            "user_phone_number",
            "user_grade_year",
        ]
