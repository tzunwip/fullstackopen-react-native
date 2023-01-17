import { useQuery } from "@apollo/client";
import { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Menu, Button, Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

import { gql } from "../__generated__";
import { GetRepositoriesQueryVariables } from "../__generated__/graphql";
import theme from "../theme";
import RepositoryItem from "./RepositoryItem";
import RepositoryListItemWrapper from "./RepositoryListItemWrapper";
import { PrimaryText } from "./Text";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  separator: {
    height: 2,
    backgroundColor: "lightgrey",
  },
  menu: {
    alignSelf: "flex-start",
    paddingVertical: 5,
  },
  menuButton: {
    color: theme.colors.textPrimary,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const GET_REPOSITORIES = gql(/* GraphQL */ `
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
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
  { title: string; icon: string; variables: GetRepositoriesQueryVariables }
>;

const sortConfig: SortConfig = {
  latest: {
    title: "Latest",
    icon: "sort-clock-ascending-outline",
    variables: { orderBy: "CREATED_AT", orderDirection: "DESC" },
  },
  highestRated: {
    title: "Highest Rated",
    icon: "sort-variant",
    variables: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
  },
  lowestRated: {
    title: "Lowest Rated",
    icon: "sort-reverse-variant",
    variables: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
  },
};

const RepositoryList = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  function handleItemPress(sortMode: SortMode) {
    setSortMode(sortMode);
    setShowMenu(false);
  }

  function handleChangeSearch(query: string) {
    setSearchQuery(query);
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search..."
        onChangeText={handleChangeSearch}
        value={searchQuery}
      />
      <View style={styles.menu}>
        <Menu
          visible={showMenu}
          onDismiss={() => setShowMenu(false)}
          anchorPosition="bottom"
          anchor={
            <Button
              icon={sortConfig[sortMode].icon}
              onPress={() => setShowMenu(true)}
              labelStyle={styles.menuButton}
            >
              Sorted by {sortConfig[sortMode].title}
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
      <List sortMode={sortMode} debouncedSearchQuery={debouncedSearchQuery} />
    </View>
  );
};

interface ListProps {
  sortMode: SortMode;
  debouncedSearchQuery: string;
}

function List({ sortMode, debouncedSearchQuery }: ListProps) {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      ...sortConfig[sortMode].variables,
      searchKeyword: debouncedSearchQuery,
    },
  });

  if (loading) return <PrimaryText>Loading...</PrimaryText>;
  if (!data || data?.repositories.edges.length === 0)
    return <PrimaryText>No repositories found</PrimaryText>;

  const renderItem = ({
    item,
  }: {
    item: typeof data.repositories.edges[number];
  }) => (
    <RepositoryListItemWrapper id={item.node.id}>
      <RepositoryItem item={item.node} />
    </RepositoryListItemWrapper>
  );

  return (
    <FlatList
      data={data.repositories.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
}

export default RepositoryList;
