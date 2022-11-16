import { StyleSheet, View, Image } from "react-native";
import Stat from "./Stat";
import Profile from "./Profile";
import { Repository } from "./RepositoryList";

interface RepositoryItemProps {
  item: Repository;
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

export default function RepositoryItem(props: RepositoryItemProps) {
  const { item } = props;

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
      </View>
      <View style={styles.profile}>
        <Profile item={item} />
      </View>
      <View style={styles.statLine}>
        <Stat label="Stars" value={item.stargazersCount} />
        <Stat label="Forks" value={item.forksCount} />
        <Stat label="Reviews" value={item.reviewCount} />
        <Stat label="Rating" value={item.ratingAverage} />
      </View>
    </View>
  );
}
