import { useQuery } from "@apollo/client";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { useParams } from "react-router-native";

import { gql } from "../__generated__";
import RepositoryItem from "./RepositoryItem";
import RepositoryReview from "./RepositoryReview";

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "lightgrey",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const GET_REPOSITORY = gql(/* GraphQL */ `
  query GetRepository($id: ID!) {
    repository(id: $id) {
      ...RepositoryProfile
      reviews {
        edges {
          node {
            id
            ...RepositoryReview
          }
        }
      }
    }
  }
`);

function RepositoryView() {
  const { repositoryId } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id: repositoryId ?? "" },
    fetchPolicy: "cache-and-network",
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
    <View>
      <RepositoryItem item={data.repository} showGithubLink />
      <FlatList
        data={data.repository.reviews.edges}
        renderItem={renderItem}
        keyExtractor={(item) => item.node.id}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
}

export default RepositoryView;
