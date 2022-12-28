import { StyleSheet, View, Image } from "react-native";

import { FragmentType, useFragment } from "../__generated__/";
import { RepositoryItemFragment } from "../graphql/fragments";
import Profile from "./Profile";
import Stat from "./Stat";

interface RepositoryItemProps {
  item: FragmentType<typeof RepositoryItemFragment>;
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    height: 50,
    width: 50,
    margin: 10,
    borderRadius: 2,
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    margin: 10,
  },
  statLine: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
  },
});

export default function RepositoryItem({ item }: RepositoryItemProps) {
  const repository = useFragment(RepositoryItemFragment, item);
  const {
    fullName,
    description,
    language,
    ownerAvatarUrl,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
  } = repository;

  return (
    <View style={styles.container} testID="repository-item">
      {ownerAvatarUrl && (
        <View>
          <Image
            style={styles.image}
            source={{ uri: ownerAvatarUrl }}
            accessibilityIgnoresInvertColors={false}
          />
        </View>
      )}
      <View style={styles.profile}>
        <Profile {...{ fullName, description, language }} />
      </View>
      <View style={styles.statLine}>
        <Stat
          label="Stars"
          value={stargazersCount}
          testID="repository-item-stars"
        />
        <Stat label="Forks" value={forksCount} testID="repository-item-forks" />
        <Stat
          label="Reviews"
          value={reviewCount}
          testID="repository-item-reviews"
        />
        <Stat
          label="Rating"
          value={ratingAverage}
          testID="repository-item-rating"
        />
      </View>
    </View>
  );
}
