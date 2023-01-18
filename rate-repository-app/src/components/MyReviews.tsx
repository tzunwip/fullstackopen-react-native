import { Text, FlatList, View, StyleSheet } from "react-native";

import useMyReviews from "../hooks/useMyReviews";
import Review from "./Review";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function MyReviews() {
  const { data, loading, fetchMore, error } = useMyReviews({ first: 5 });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>There seems to be an error: {error.message}</Text>;
  if (!data?.me?.reviews.edges || data?.me?.reviews.edges.length === 0)
    return <Text>Reviews could not be found!</Text>;

  const renderItem = ({
    item,
  }: {
    item: (typeof data.me.reviews.edges)[number];
  }) => <Review item={item.node} mode="repository" />;

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
