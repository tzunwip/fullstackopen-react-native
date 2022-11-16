import { View, StyleSheet, Pressable, Text } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.viewPrimary,
    paddingVertical: 20,
    flexDirection: "row",
  },
  text: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: "700",
    color: theme.colors.viewPrimaryText,
  },
  pressable: {
    marginLeft: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.pressable}>
        <Text style={styles.text}>Repositories</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
