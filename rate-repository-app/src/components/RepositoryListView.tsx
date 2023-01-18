import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Menu, Button, Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

import { GetRepositoriesQueryVariables } from "../__generated__/graphql";
import theme from "../theme";
import RepositoryList from "./RepositoryList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  menu: {
    alignSelf: "flex-start",
    paddingVertical: 5,
  },
  menuButton: {
    color: theme.colors.textPrimary,
  },
});

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

const RepositoryListView = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const queryVariables = {
    first: 8,
    searchKeyword: debouncedSearchQuery,
    ...sortConfig[sortMode].variables,
  } satisfies GetRepositoriesQueryVariables;

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
      <RepositoryList variables={queryVariables} />
    </View>
  );
};

export default RepositoryListView;
