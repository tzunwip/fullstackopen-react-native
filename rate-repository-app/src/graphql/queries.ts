import { gql } from "../__generated__/gql";

export const GET_REPOSITORIES = gql(/* GraphQL */ `
  query GetRepositories {
    repositories {
      edges {
        node {
          ...RepositoryItem
        }
      }
    }
  }
`);

export const GET_ME = gql(/* GraphQL */ `
  query Me {
    me {
      ...Me
    }
  }
`);
