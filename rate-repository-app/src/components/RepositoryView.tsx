import { useQuery } from "@apollo/client";
import { View, Text, FlatList } from "react-native";
import { useParams } from "react-router-native";

import { gql } from "../__generated__";
import RepositoryItem from "./RepositoryItem";
import RepositoryReview from "./RepositoryReview";

const GET_REPOSITORY = gql(/* GraphQL */ `
  query GetRepository($id: ID!) {
    repository(id: $id) {
      ...RepositoryProfile
      reviews {
        edges {
          node {
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
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>There seems to be an error.</Text>;
  if (!data?.repository) return <Text>Repository could not be found!</Text>;

  const renderItem = ({
    item,
  }: {
    item: typeof data.repository.reviews.edges[number];
  }) => <RepositoryReview item={item.node} />;

  return (
    <View>
      <RepositoryItem item={data.repository} showGithubLink />
      <FlatList data={data.repository.reviews.edges} renderItem={renderItem} />
    </View>
  );
}

export default RepositoryView;
