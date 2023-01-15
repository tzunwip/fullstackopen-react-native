import { useQuery } from "@apollo/client";
import { FlatList, View, StyleSheet } from "react-native";

import { GET_REPOSITORIES } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import RepositoryListItemWrapper from "./RepositoryListItemWrapper";
import { PrimaryText } from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "lightgrey",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <PrimaryText>Loading..</PrimaryText>;
  if (!data) return <PrimaryText>No Data...</PrimaryText>;

  return (
    <FlatList
      data={data.repositories.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <RepositoryListItemWrapper item={item.node}>
          <RepositoryItem item={item.node} />
        </RepositoryListItemWrapper>
      )}
    />
  );
};

export default RepositoryList;
