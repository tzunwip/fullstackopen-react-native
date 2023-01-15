import { useQuery } from "@apollo/client";
import { FlatList, View, StyleSheet } from "react-native";

import { gql } from "../__generated__";
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

const GET_REPOSITORIES = gql(/* GraphQL */ `
  query GetRepositories {
    repositories {
      edges {
        node {
          id
          ...RepositoryProfile
        }
      }
    }
  }
`);

const RepositoryList = () => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <PrimaryText>Loading..</PrimaryText>;
  if (!data?.repositories) return <PrimaryText>No Data...</PrimaryText>;

  const renderItem = ({
    item,
  }: {
    item: typeof data.repositories.edges[number];
  }) => {
    return (
      <RepositoryListItemWrapper id={item.node.id}>
        <RepositoryItem item={item.node} />
      </RepositoryListItemWrapper>
    );
  };

  return (
    <FlatList
      data={data.repositories.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

export default RepositoryList;
