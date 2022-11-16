import { View, StyleSheet, ScrollView } from "react-native";
import AppBarButton from "./AppBarButton";
import Constants from "expo-constants";
import theme from "../theme";

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
        <AppBarButton label="Sign In" to="/signin" />
        <AppBarButton label="Respositories" to="/" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
