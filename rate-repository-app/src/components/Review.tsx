import { useMutation } from "@apollo/client";
import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
import { useNavigate } from "react-router-native";

import { useFragment, FragmentType, gql } from "../__generated__";
import theme from "../theme";
import { PrimaryText, SecondaryText } from "./Text";

const styles = StyleSheet.create({
  reviewContainer: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
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
  nameDateText: {
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
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
      id
    }
    user {
      id
      username
    }
  }
`);

interface ReviewProps {
  mode: "user" | "repository";
  item: FragmentType<typeof RepositoryReviewFragment>;
}

function Review({ mode, item }: ReviewProps) {
  const { id, text, rating, createdAt, user, repository } = useFragment(
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
        <SecondaryText style={styles.nameDateText}>{`${
          content.name
        } on ${Intl.DateTimeFormat("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }).format(new Date(createdAt))}`}</SecondaryText>
        {mode === "repository" && (
          <View style={styles.buttonsContainer}>
            <ViewRepositoryButton repositoryId={repository.id} />
            <DeleteReviewButton reviewId={id} />
          </View>
        )}
      </View>
    </View>
  );
}

export default Review;

const buttonStyles = StyleSheet.create({
  viewRepository: {
    backgroundColor: theme.colors.viewSecondary,
    color: theme.colors.viewSecondaryText,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    height: 40,
    marginRight: 10,
  },
  deleteReview: {
    backgroundColor: theme.colors.red,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    height: 40,
  },
  text: {
    color: theme.colors.viewSecondaryText,
    fontWeight: "600",
  },
});

interface ViewRepositoryButtonProps {
  repositoryId: string;
}

function ViewRepositoryButton({ repositoryId }: ViewRepositoryButtonProps) {
  const navigate = useNavigate();

  function handlePress() {
    navigate(`/repository/${repositoryId}`);
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={handlePress}
      style={buttonStyles.viewRepository}
    >
      <Text style={buttonStyles.text}>View Repository</Text>
    </Pressable>
  );
}

interface DeleteReviewButtonProps {
  reviewId: string;
}

const DELETE_REVIEW = gql(/*GraphQL*/ `
  mutation DeleteReview ($id: ID!) {
      deleteReview (id: $id)  
      }
`);

function DeleteReviewButton({ reviewId }: DeleteReviewButtonProps) {
  const [deleteReview, { loading, client }] = useMutation(DELETE_REVIEW, {
    variables: { id: reviewId },
  });

  async function handlePress() {
    try {
      await deleteReview();
      client.refetchQueries({ include: ["MyReviews"] });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  }

  function ConfirmDeleteAlert() {
    return Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: handlePress },
      ]
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={ConfirmDeleteAlert}
      disabled={loading}
      style={buttonStyles.deleteReview}
    >
      <Text style={buttonStyles.text}>Delete Review</Text>
    </Pressable>
  );
}
