import Constants from "expo-constants";
import { View, StyleSheet, ScrollView } from "react-native";

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

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <SignOutButton />
        <AppBarButton label="Respositories" to="/" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
