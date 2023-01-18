import { StyleSheet, View, Text, FlatList } from "react-native";
import { useParams } from "react-router-native";

import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import RepositoryReview from "./RepositoryReview";

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "lightgrey",
  },
  container: {
    flex: 1,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

function RepositoryView() {
  const { repositoryId } = useParams();
  const { data, loading, error, fetchMore } = useRepository({
    id: repositoryId ?? "",
    first: 2,
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>There seems to be an error.</Text>;
  if (!data?.repository) return <Text>Repository could not be found!</Text>;

  interface FlatListMethodParams {
    item: (typeof data.repository.reviews.edges)[number];
  }

  const renderItem = ({ item }: FlatListMethodParams) => (
    <RepositoryReview item={item.node} />
  );

  return (
    <View style={styles.container}>
      <RepositoryItem item={data.repository} showGithubLink />
      <FlatList
        data={data.repository.reviews.edges}
        renderItem={renderItem}
        keyExtractor={(item) => item.node.id}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

export default RepositoryView;
