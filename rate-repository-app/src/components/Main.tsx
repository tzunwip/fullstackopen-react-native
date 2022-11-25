import { useQuery } from "@apollo/client";
import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import { Routes, Route, Navigate } from "react-router-native";
import { GET_ME } from "../graphql/queries";
import theme from "../theme";
import AuthWrapper from "./AuthWrapper";
import MainLayout from "./MainLayout";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";

const styles = StyleSheet.create({
  container: {
    fontFamily: theme.fonts.main,
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  const { data, loading } = useQuery(GET_ME);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <View style={styles.container}>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route element={<AuthWrapper me={data?.me} />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<RepositoryList />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </View>
    </>
  );
};

export default Main;
