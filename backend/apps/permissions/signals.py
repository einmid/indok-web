from typing import TYPE_CHECKING
from uuid import uuid4

from django.conf import settings
from django.contrib.auth.models import Group, Permission
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from django.db.models.signals import post_migrate, pre_save
from django.dispatch import receiver

from apps.permissions.constants import DEFAULT_GROUPS, DEFAULT_ORGANIZATION_PERMISSIONS, ORGANIZATION
from apps.permissions.models import ResponsibleGroup

if TYPE_CHECKING:
    from django.contrib.auth import models


@receiver(pre_save, sender=ResponsibleGroup)
def create_named_group(sender, instance: ResponsibleGroup, **kwargs):
    try:
        instance.group
    except ObjectDoesNotExist:
        prefix: str = instance.organization.name
        group = Group.objects.create(name=f"{prefix}:{instance.name}:{uuid4().hex}")
        instance.group = group


@receiver(post_migrate)
def create_default_groups(apps, **kwargs):
    Group: "models.Group" = apps.get_model("auth", "Group")
    Permission: "models.Permission" = apps.get_model("auth", "Permission")
    for group_name, permissions in DEFAULT_GROUPS.items():
        group, _ = Group.objects.get_or_create(name=group_name)
        if len(permissions) > 0:
            query: Q = Q()
            for permission in permissions:
                query |= Q(codename=permission[1], content_type__app_label=permission[0])
            group.permissions.set(Permission.objects.filter(query))
        else:
            group.permissions.set([])


@receiver(post_migrate)
def assign_standard_organization_permissions(apps, **kwargs):
    """
    Assigns default organization permissions to all users in an organization
    """
    User = apps.get_model("users", "User")
    group, _ = Group.objects.get_or_create(name=ORGANIZATION)
    query: Q = Q()

    for perm in DEFAULT_ORGANIZATION_PERMISSIONS:
        query |= Q(content_type__app_label=perm[0], codename=perm[1])

    permissions = Permission.objects.filter(query)
    group.permissions.set(permissions)
    group.user_set.set(
        User.objects.exclude(username=settings.ANONYMOUS_USER_NAME)
        .exclude(organizations=None)
        .values_list("id", flat=True)
    )


@receiver(post_migrate)
def synchronize_group_and_responsible_group_names(apps, **kwargs):
    """
    Synchronizes the names of organizations' responsible groups and their attached Groups
    """
    Organization = apps.get_model("organizations", "Organization")

    for organization in Organization.objects.all():
        for responsible_group in organization.permission_groups.all():
            group_name_split: list[str] = responsible_group.group.name.split(":", 2)
            if len(group_name_split) == 3:
                if group_name_split[1] != responsible_group.name:
                    responsible_group.group.name = (
                        f"{group_name_split[0]}:{responsible_group.name}:{group_name_split[2]}"  # noqa
                    )
