import { gql } from "../__generated__";

export const RepositoryItemFragment = gql(/* GraphQL */ `
  fragment RepositoryItem on Repository {
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
  }
`);

export const MeFragment = gql(/* GraphQL */ `
  fragment Me on User {
    id
    username
  }
`);
