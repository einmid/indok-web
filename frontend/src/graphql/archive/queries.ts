import { gql } from "@apollo/client";

export const DOCUMENTS = gql`
  query {
    allArchives {
      id
      title
      thumbnail
      typeDoc
      webLink
    }
  }
`;

export const DOCUMENT = gql`
  query archive($ID: ID!) {
    archive(id: $ID) {
      id
      title
      thumbnail
      typeDoc
      webLink
    }
  }
`;

export const GET_DOCSBYFILTERS = gql`
  query archiveByTypes($document_types: [String]!, $year: Int) {
    archiveByTypes(typeDoc: $document_types, year: $year) {
      id
      title
      thumbnail
      typeDoc
      year
      webLink
    }
  }
`;
