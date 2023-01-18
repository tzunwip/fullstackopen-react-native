import { FlatList, View, StyleSheet } from "react-native";

import { GetRepositoriesQueryVariables } from "../__generated__/graphql";
import useRepositories from "../hooks/useRepositories";
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

interface ListProps {
  variables: GetRepositoriesQueryVariables;
}

function RepositoryList({ variables }: ListProps) {
  const { data, loading } = useRepositories(variables);

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
