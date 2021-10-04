import graphene
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required
from .models import Attendable, Category, Event, SignUp


class UserAttendingType(graphene.ObjectType):
    is_signed_up = graphene.Boolean()  # NOTE: Her mener vi kanksje is_attending?
    is_on_waiting_list = graphene.Boolean()


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


class GradeDistributionType(graphene.ObjectType):
    cateogry = graphene.String()
    available_slots = graphene.Int()


class AttendableType(DjangoObjectType):
    class Meta:
        model = Attendable
        fields = ["id", "signup_open_date", "deadline", "binding_signup", "price"]


class EventType(DjangoObjectType):
    user_attendance = graphene.Field(UserAttendingType)
    users_on_waiting_list = graphene.List(SignUpType)
    users_attending = graphene.List(SignUpType)
    available_slots = graphene.List(GradeDistributionType)
    attendable = graphene.Field(AttendableType)

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
            "publisher",
            "short_description",
            "contact_email",
        ]

    class PermissionDecorators:
        @staticmethod
        def is_in_event_organization(resolver):
            def wrapper(event: Event, info):
                user = info.context.user
                if user.memberships.filter(organization=event.organization).exists() or user.is_superuser:
                    return resolver(event, info)
                else:
                    raise PermissionError(
                        f"Du må være medlem av organisasjonen {event.organization.name} for å gjøre dette kallet"
                    )

            return wrapper

    @staticmethod
    def resolve_user_attendance(event, info):
        user = info.context.user
        attending, waiting_list = event.get_attendance_and_waiting_list()
        return {
            "is_signed_up": user in attending,
            "is_on_waiting_list": user in waiting_list,
        }

    @staticmethod
    def resolve_allowed_grade_years(event, info):
        return [int(grade) for grade in event.allowed_grade_years]

    @staticmethod
    @login_required
    @PermissionDecorators.is_in_event_organization
    def resolve_users_on_waiting_list(event, info):
        _, waiting_list = event.get_attendance_and_waiting_list()
        return SignUp.objects.filter(event=event, user__in=waiting_list, is_attending=True)

    @staticmethod
    @login_required
    @PermissionDecorators.is_in_event_organization
    def resolve_users_attending(event, info):
        attending, _ = event.get_attendance_and_waiting_list()
        return SignUp.objects.filter(event=event, user__in=attending, is_attending=True)

    @staticmethod
    def resolve_available_slots(event, info):
        user = info.context.user
        if not user.is_authenticated or not user.memberships.filter(organization=event.organization).exists():
            return None
        return event.available_slots

    @staticmethod
    def resolve_attendable(event, info):
        user = info.context.user
        if (
            not user.is_authenticated
            or not user.memberships.filter(organization=event.organization).exists()
            or not hasattr(event, "attendable")
        ):
            return None
        return event.attendable


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = [
            "id",
            "name",
        ]
