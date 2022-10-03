import graphene
from graphene import NonNull

from .mutations import (
    CreateArchiveDocument,
    DeleteArchiveDocument,
    UpdateArchiveDocument,
)
from .resolvers import ArchiveDocumentResolvers
from .types import ArchiveDocumentType


class ArchiveMutations(graphene.ObjectType):
    create_archiveDocument = CreateArchiveDocument.Field()
    update_archiveDocument = UpdateArchiveDocument.Field()
    delete_archiveDocument = DeleteArchiveDocument.Field()


class ArchiveQueries(graphene.ObjectType, ArchiveDocumentResolvers):
    featured_archive = graphene.List(NonNull(ArchiveDocumentType), required=True)
    archive_by_types = graphene.List(
        NonNull(ArchiveDocumentType),
        type_doc=graphene.List(graphene.String, required=True),
        year=graphene.Int(required=False),
        names=graphene.String(required=False),
        required=True,
    )
    available_years = graphene.List(NonNull(graphene.String), required=True)
