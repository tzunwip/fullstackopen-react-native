import { View, Text } from "react-native";

import { useFragment, FragmentType, gql } from "../__generated__";

const RepositoryReviewFragment = gql(/* GraphQL */ `
  fragment RepositoryReview on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
  }
`);

interface RepositoryReviewProps {
  item: FragmentType<typeof RepositoryReviewFragment>;
}

function RepositoryReview({ item }: RepositoryReviewProps) {
  const { text, rating, createdAt, user } = useFragment(
    RepositoryReviewFragment,
    item
  );

  return (
    <View>
      <Text>{`${rating} ${text}`}</Text>
      <Text>{`${user.username} at ${createdAt}`}</Text>
    </View>
  );
}

export default RepositoryReview;
