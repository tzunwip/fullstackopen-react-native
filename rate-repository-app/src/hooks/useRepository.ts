import { useQuery } from "@apollo/client";

import { gql } from "../__generated__";
import { GetRepositoryQueryVariables } from "../__generated__/graphql";

const GET_REPOSITORY = gql(/* GraphQL */ `
  query GetRepository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryProfile
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            ...RepositoryReview
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`);

function useRepository(variables: GetRepositoryQueryVariables) {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  function handleFetchMore() {
    const canFetchMore =
      !loading && data?.repository?.reviews.pageInfo.hasNextPage;

    if (canFetchMore) {
      fetchMore({
        variables: {
          ...variables,
          after: data.repository?.reviews.pageInfo.endCursor,
        },
      });
    }
  }

  return {
    data,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
}

export default useRepository;
