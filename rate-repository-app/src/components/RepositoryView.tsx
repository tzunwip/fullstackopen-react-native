import { useQuery } from "@apollo/client";
import { View, Text } from "react-native";
import { useParams } from "react-router-native";

import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";

function RepositoryView() {
  const { repositoryId } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id: repositoryId ?? "" },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>There seems to be an error.</Text>;
  if (!data || !data.repository)
    return <Text>Repository could not be found!</Text>;

  return (
    <View>
      <RepositoryItem item={data.repository} showGithubLink />
    </View>
  );
}

export default RepositoryView;
