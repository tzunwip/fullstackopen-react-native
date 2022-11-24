import { gql } from "../__generated__";

export const RepositoryItemFragment = gql(`
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
