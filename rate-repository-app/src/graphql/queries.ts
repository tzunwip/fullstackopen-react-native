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
