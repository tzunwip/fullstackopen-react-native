import { StyleSheet, View, Text } from "react-native";

import { useFragment, FragmentType, gql } from "../__generated__";
import theme from "../theme";
import { PrimaryText, SecondaryText } from "./Text";

const styles = StyleSheet.create({
  reviewContainer: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  ratingContainer: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    borderRadius: 5,
  },
  rating: {
    color: theme.colors.viewPrimaryText,
    fontWeight: "800",
    fontSize: 20,
  },
  textContainer: {
    flexDirection: "column",
    flex: 1,
  },
  text: {
    marginBottom: 10,
  },
});

function getRatingColor(rating: number) {
  return rating > 79
    ? theme.colors.green
    : rating > 59
    ? theme.colors.lightGreen
    : rating > 39
    ? theme.colors.amber
    : rating > 19
    ? theme.colors.orange
    : theme.colors.red;
}

const RepositoryReviewFragment = gql(/* GraphQL */ `
  fragment RepositoryReview on Review {
    id
    text
    rating
    createdAt
    repository {
      fullName
    }
    user {
      id
      username
    }
  }
`);

interface RepositoryReviewProps {
  mode: "user" | "repository";
  item: FragmentType<typeof RepositoryReviewFragment>;
}

function RepositoryReview({ mode, item }: RepositoryReviewProps) {
  const { text, rating, createdAt, user, repository } = useFragment(
    RepositoryReviewFragment,
    item
  );

  const content = {
    user: {
      name: user.username,
    },
    repository: {
      name: repository.fullName,
    },
  }[mode];

  return (
    <View style={styles.reviewContainer}>
      <View
        style={{
          ...styles.ratingContainer,
          backgroundColor: getRatingColor(rating),
        }}
      >
        <Text style={styles.rating}>{rating}</Text>
      </View>
      <View style={styles.textContainer}>
        <PrimaryText style={styles.text}>{text}</PrimaryText>
        <SecondaryText>{`${content.name} on ${Intl.DateTimeFormat("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }).format(new Date(createdAt))}`}</SecondaryText>
      </View>
    </View>
  );
}

export default RepositoryReview;
