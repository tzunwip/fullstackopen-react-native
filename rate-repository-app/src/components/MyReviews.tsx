import { Text, FlatList, View, StyleSheet } from "react-native";

import useMyReviews from "../hooks/useMyReviews";
import RepositoryReview from "./RepositoryReview";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function MyReviews() {
  const { data, loading, fetchMore, error } = useMyReviews({ first: 2 });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>There seems to be an error: {error.message}</Text>;
  if (!data?.me?.reviews.edges || data?.me?.reviews.edges.length === 0)
    return <Text>Reviews could not be found!</Text>;

  const renderItem = ({
    item,
  }: {
    item: (typeof data.me.reviews.edges)[number];
  }) => <RepositoryReview item={item.node} mode="repository" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data.me?.reviews.edges}
        renderItem={renderItem}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

export default MyReviews;
