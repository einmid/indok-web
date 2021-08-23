from django.db.models.signals import post_save, pre_delete, pre_save
from django.dispatch import receiver
from django.contrib.auth.models import Group
from guardian.shortcuts import assign_perm

from apps.organizations.models import Membership, Organization
from apps.permissions.models import ResponsibleGroup

@receiver(post_save, sender=Membership)
def handle_new_member(sender, **kwargs):
    member: Membership = kwargs["instance"]
    group: Group = member.organization.primary_group.group
    if group:
        user= member.user
        user.groups.add(group)
        user.save()


@receiver(pre_delete, sender=Membership)
def handle_removed_memeber(sender, **kwargs):
    member: Membership = kwargs["instance"]
    group: Group = member.organization.primary_group.group
    if group:
        user = member.user
        user.groups.remove(group)
        user.save()

@receiver(pre_save, sender=Organization)
def create_primary_group(sender, instance, **kwargs):
  """
  Creates and assigns a primary group and HR group to members of the organization.
  """
  try: 
    instance.primary_group
  except ResponsibleGroup.DoesNotExist:
    primary_group = ResponsibleGroup.objects.create(name=instance.name, description=f"Medlemmer av {instance.name}.")
    instance.primary_group = primary_group

  try:
    instance.hr_group
  except ResponsibleGroup.DoesNotExist:
    hr_group = ResponsibleGroup.objects.create(name="HR", description=f"HR-gruppen til {instance.name}. Tillatelser for å se og behandle søknader.")
    assign_perm("forms.add_form", hr_group.group)
    instance.hr_group = hr_group
