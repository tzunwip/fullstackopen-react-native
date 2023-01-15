import { useQuery } from "@apollo/client";
import Constants from "expo-constants";
import { StyleSheet, View, Text } from "react-native";
import { Routes, Route, Navigate } from "react-router-native";

import { gql } from "../__generated__/";
import theme from "../theme";
import AuthWrapper from "./AuthWrapper";
import MainLayout from "./MainLayout";
import RepositoryList from "./RepositoryList";
import RepositoryView from "./RepositoryView";
import SignIn from "./SignIn";

const styles = StyleSheet.create({
  container: {
    fontFamily: theme.fonts.main,
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const GET_ME = gql(/* GraphQL */ `
  query Me {
    me {
      id
      username
    }
  }
`);

const Main = () => {
  const { data, loading } = useQuery(GET_ME);

  if (loading) return <Text>Loading...</Text>;

  return (
    <>
      <View style={styles.container}>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route element={<AuthWrapper me={data?.me} />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<RepositoryList />} />
              <Route path="repository">
                <Route path=":repositoryId" element={<RepositoryView />} />
                <Route index element={<RepositoryList />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </View>
    </>
  );
};

export default Main;
