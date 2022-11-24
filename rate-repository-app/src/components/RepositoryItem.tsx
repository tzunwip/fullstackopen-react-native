import { StyleSheet, View, Image } from "react-native";
import Stat from "./Stat";
import Profile from "./Profile";
import { FragmentType, useFragment } from "../__generated__/";
import { RepositoryItemFragment } from "../graphql/fragments";

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
    <View style={styles.container}>
      {ownerAvatarUrl && (
        <View>
          <Image style={styles.image} source={{ uri: ownerAvatarUrl }} />
        </View>
      )}
      <View style={styles.profile}>
        <Profile {...{ fullName, description, language }} />
      </View>
      <View style={styles.statLine}>
        <Stat label="Stars" value={stargazersCount} />
        <Stat label="Forks" value={forksCount} />
        <Stat label="Reviews" value={reviewCount} />
        <Stat label="Rating" value={ratingAverage} />
      </View>
    </View>
  );
}
