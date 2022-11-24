import { gql } from "../__generated__/gql";

export const GET_REPOSITORIES = gql(`
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
