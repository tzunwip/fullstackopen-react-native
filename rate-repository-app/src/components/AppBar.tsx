import Constants from "expo-constants";
import { View, StyleSheet, ScrollView } from "react-native";

import { MeQuery } from "../__generated__/graphql";
import theme from "../theme";
import AppBarButton from "./AppBarButton";
import SignOutButton from "./SignOutButton";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.viewPrimary,
    paddingVertical: 20,
    flexDirection: "row",
  },
});

interface AppBarProps {
  me: MeQuery["me"];
}

const AppBar = ({ me }: AppBarProps) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {me ? (
          <>
            <AppBarButton label="Respositories" to="/" />
            <AppBarButton label="My Reviews" to="/user/reviews" />
            <AppBarButton label="Create Review" to="/user/create-review" />
            <SignOutButton />
          </>
        ) : (
          <>
            <AppBarButton label="Sign In" to="/signin" />
            <AppBarButton label="Sign Up" to="/signup" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
