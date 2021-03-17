from datetime import date

from apps.events.models import Category, Event
from apps.organizations.models import Organization
from django.db.models import Q
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from datetime import date
import pandas as pd
import json
import io

from collections import namedtuple
import base64


DEFAULT_REPORT_FIELDS = [
    "event_title",
    "user_last_name",
    "user_first_name",
    "user_phone_number",
    "user_email",
    "user_year",
    "user_allergies",
]

FiletypeSpec = namedtuple("Filetype", ["content_type", "extension"])
filetype_specs = {
    "xlsx": FiletypeSpec(
        content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        extension="xlsx",
    ),
    "csv": FiletypeSpec(content_type="text/csv", extension="csv"),
    "html": FiletypeSpec(content_type="text/html", extension="html"),
}


class EventResolvers:
    def resolve_all_events(
        self, info, category=None, organization=None, start_time=None, end_time=None
    ):
        string_names = ["category", "example_filter_1", "example_filter_2"]
        kwargs = {
            f"{string_names[i]}": element
            for i, element in enumerate([category])
            if element != None
        }
        if kwargs or organization or start_time or end_time:
            filteredEvents = Event.objects

            if start_time and end_time:
                filteredEvents = filteredEvents.filter(
                    start_time__range=(start_time, end_time)
                )

            elif start_time:
                filteredEvents = filteredEvents.filter(start_time__gte=(start_time))

            elif end_time:
                filteredEvents = filteredEvents.filter(start_time__lte=(end_time))

            queries = []
            if category != None:
                kwargs["category__name"] = category
                del kwargs["category"]

            new_kwargs = {f"{k}__icontains": v for k, v in kwargs.items()}
            queries = [Q(**{k: v}) for k, v in new_kwargs.items()]

            if organization:
                queries.append(
                    Q(organization__name__icontains=organization)
                    | Q(organization__parent__name__icontains=organization)
                )

            return (
                filteredEvents.filter(*queries)
                .filter(start_time__gte=date.today())
                .order_by("start_time")
            )
        return Event.objects.filter(start_time__gte=date.today()).order_by("start_time")

    def resolve_default_events(self, info):
        organizations = Organization.objects.all()
        all_events = Event.objects.filter(start_time__gte=date.today())
        events = []
        for organization in organizations:
            try:
                first_matching_event = all_events.get(organization=organization)
                events.append(first_matching_event.id)
            except:
                pass
        return Event.objects.filter(id__in=events).order_by("start_time")

    def resolve_event(self, info, id):
        try:
            return Event.objects.get(id=id)
        except Event.DoesNotExist:
            return None

    def resolve_all_categories(self, info):
        return Category.objects.all()

    def resolve_category(self, info, id):
        try:
            return Category.objects.get(id=id)
        except Category.DoesNotExist:
            return None

    def resolve_attendee_report(self, info, event_id, fields=None, filetype="xlsx"):
        df = create_attendee_report([event_id], fields)
        file_basename = f"attendee_report__eventid_{event_id}"
        return wrap_attendee_report_as_json(df, file_basename, filetype)

    def resolve_attendee_reports(self, info, event_ids, fields=None, filetype="xlsx"):
        df = create_attendee_report(event_ids, fields)
        file_basename = (
            f"attendee_report__eventid_{'|'.join(str(id_) for id_ in event_ids)}"
        )
        return wrap_attendee_report_as_json(df, file_basename, filetype)

    def resolve_attendee_report_org(self, info, org_id, fields=None, filetype="xlsx"):
        event_ids = Organization.objects.get(id=org_id).event_set.values_list(
            "id", flat=True
        )
        df = create_attendee_report(event_ids, fields)
        file_basename = f"attendee_report__orgid_{org_id}"
        return wrap_attendee_report_as_json(df, file_basename, filetype)


def create_attendee_report(event_ids, fields):
    fields = fields if fields is not None else DEFAULT_REPORT_FIELDS
    user_ids = Event.objects.filter(id__in=event_ids).values_list(
        "signed_up_users__id", flat=True
    )

    # Fetch data
    df_events = (
        pd.DataFrame(Event.objects.filter(id__in=event_ids).values())
        .set_index("id")
        .add_prefix("event_")
    )
    df_users = (
        pd.DataFrame(get_user_model().objects.filter(id__in=user_ids).values())
        .set_index("id")
        .add_prefix("user_")
    )
    df_events_users = pd.DataFrame(Event.signed_up_users.through.objects.all().values())
    df_joined = (
        df_events_users.join(df_events, on="event_id", how="inner")
        .join(df_users, on="user_id", how="inner")
        .sort_values(["event_id", "user_id"])
    )

    # Return empty dataframe, lookups on an empty frame will raise an exception
    if df_joined.empty:
        return pd.DataFrame()
    return (
        df_joined.loc[:, DEFAULT_REPORT_FIELDS]
        .drop("password", errors="ignore", axis=1)
        .loc[:, fields]
    )


def wrap_attendee_report_as_json(df, file_basename, filetype):
    # Handle different content types
    if filetype == "xlsx":
        buffer = io.BytesIO()
        with pd.ExcelWriter(
            buffer, engine="xlsxwriter", options={"remove_timezone": True}
        ) as writer:
            df.to_excel(writer, index=False)
        data = base64.b64encode(buffer.getvalue()).decode("utf-8")
    elif filetype == "csv":
        data = df.to_csv(index=False)
    elif filetype == "html":
        data = df.to_html(index=False)
    else:
        raise ValueError(f"Filetype not supported: '{filetype}'")

    spec = filetype_specs[filetype]
    response = {
        "data": data,
        "filename": f"{file_basename}.{spec.extension}",
        "contentType": spec.content_type,
    }
    return json.dumps(response)
