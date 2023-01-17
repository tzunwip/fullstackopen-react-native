import { useQuery } from "@apollo/client";
import { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Menu, Button } from "react-native-paper";

import { gql } from "../__generated__";
import { GetRepositoriesQueryVariables } from "../__generated__/graphql";
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
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          id
          ...RepositoryProfile
        }
      }
    }
  }
`);

type SortMode = "latest" | "highestRated" | "lowestRated";

type SortConfig = Record<
  SortMode,
  { title: string; variables: GetRepositoriesQueryVariables }
>;

const sortConfig: SortConfig = {
  latest: {
    title: "Latest",
    variables: { orderBy: "CREATED_AT", orderDirection: "DESC" },
  },
  highestRated: {
    title: "Highest Rated",
    variables: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
  },
  lowestRated: {
    title: "Lowest Rated",
    variables: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
  },
};

const RepositoryList = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("latest");
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: sortConfig[sortMode].variables,
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

  function handleItemPress(sortMode: SortMode) {
    setSortMode(sortMode);
    setShowMenu(false);
  }

  return (
    <>
      <View>
        <Menu
          visible={showMenu}
          onDismiss={() => setShowMenu(false)}
          anchor={
            <Button onPress={() => setShowMenu(true)}>
              Sort by {sortConfig[sortMode].title}
            </Button>
          }
        >
          <Menu.Item title="Latest" onPress={() => handleItemPress("latest")} />
          <Menu.Item
            title="Highest Rated"
            onPress={() => handleItemPress("highestRated")}
          />
          <Menu.Item
            title="Lowest Rated"
            onPress={() => handleItemPress("lowestRated")}
          />
        </Menu>
      </View>
      <FlatList
        data={data.repositories.edges}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
      />
    </>
  );
};

export default RepositoryList;
