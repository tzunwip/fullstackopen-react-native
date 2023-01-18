import { useQuery } from "@apollo/client";

import { gql } from "../__generated__";
import { GetRepositoriesQueryVariables } from "../__generated__/graphql";

const GET_REPOSITORIES = gql(/* GraphQL */ `
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          id
          ...RepositoryProfile
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);

function useRepositories(variables: GetRepositoriesQueryVariables) {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  function handleFetchMore() {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (canFetchMore) {
      fetchMore({
        variables: {
          ...variables,
          after: data.repositories.pageInfo.endCursor,
        },
      });
    }
    console.log("fetching more", data?.repositories.pageInfo.endCursor);
  }

  return {
    data,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
}

export default useRepositories;
