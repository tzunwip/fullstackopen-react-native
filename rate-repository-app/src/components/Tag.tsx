import { StyleSheet, View, Text, TextProps } from "react-native";
import theme from "../theme";

const tagStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.viewSecondary,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  text: {
    color: theme.colors.viewSecondaryText,
  },
});

function Tag({ children, ...props }: TextProps) {
  return (
    <View style={tagStyles.container} {...props}>
      <Text style={tagStyles.text}>{children}</Text>
    </View>
  );
}

export default Tag;
