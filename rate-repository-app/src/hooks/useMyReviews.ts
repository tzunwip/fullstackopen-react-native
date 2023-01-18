import { useQuery } from "@apollo/client";

import { gql } from "../__generated__/";
import { MyReviewsQueryVariables } from "../__generated__/graphql";

const MY_REVIEWS = gql(/* GraphQL */ `
  query MyReviews($first: Int, $after: String) {
    me {
      reviews(first: $first, after: $after) {
        edges {
          node {
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

function useMyReviews(variables: MyReviewsQueryVariables) {
  const { data, loading, fetchMore, ...result } = useQuery(MY_REVIEWS, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  function handleFetchMore() {
    const canFetchMore = !loading && data?.me?.reviews.pageInfo.hasNextPage;

    if (canFetchMore) {
      fetchMore({
        variables: {
          ...variables,
          after: data.me?.reviews.pageInfo.endCursor,
        },
      });
    }
    console.log("fetching");
  }

  return {
    data,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
}

export default useMyReviews;
