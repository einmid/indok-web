import graphene
from graphql_jwt.decorators import login_required
from utils.decorators import permission_required
from guardian.shortcuts import assign_perm, remove_perm

from apps.listing.models import Listing
from apps.forms.models import Form
from ..types import FormType


class FormInput(graphene.InputObjectType):
    name = graphene.String(required=False)
    organization_id = graphene.ID(required=False)
    description = graphene.String(required=False)


class BaseFormInput(graphene.InputObjectType):
    name = graphene.String()
    organization_id = graphene.ID()
    description = graphene.String()


class CreateFormInput(BaseFormInput):
    name = graphene.String(required=True)


class CreateForm(graphene.Mutation):
    form = graphene.Field(FormType)
    ok = graphene.Boolean()

    class Arguments:
        listing_id = graphene.ID()
        form_data = CreateFormInput(required=True)

    @permission_required("forms.add_form")
    def mutate(self, info, form_data, listing_id=None):
        form = Form()
        for key, value in form_data.items():
            setattr(form, key, value)
        form.save()
        if listing_id:
            listing = Listing.objects.get(pk=listing_id)
            listing.form = form
            listing.save()
        
        # Assign permission to the responsible group
        assign_perm("forms.manage_form", form.responsible_group, form)
        return CreateForm(form=form, ok=True)


class UpdateForm(graphene.Mutation):
    form = graphene.Field(FormType)
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID()
        form_data = BaseFormInput(required=True)

    @permission_required("forms.manage_form", lookup_variables=(Form, "pk", "id"))
    def mutate(self, info, id, form_data):
        form = Form.objects.get(pk=id)
        old_group = form.group
        for key, value in form_data.items():
            setattr(form, key, value)
        form.save()
        new_group = form.group
        if old_group != new_group:
            perm = "forms.manage_form"
            remove_perm(perm, old_group, form)
            assign_perm(perm, new_group, form)
        return UpdateForm(form=form, ok=True)


class DeleteForm(graphene.Mutation):
    deleted_id = graphene.ID()
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID(required=True)

    @permission_required("forms.manage_form", lookup_variables=(Form, "pk", "id"))
    def mutate(cls, self, info, id):
        form = Form.objects.get(pk=id)
        deleted_id = form.id
        form.delete()
        return DeleteForm(deleted_id=deleted_id, ok=True)
