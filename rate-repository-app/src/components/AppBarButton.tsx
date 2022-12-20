import { StyleSheet, Pressable, Text, PressableProps } from "react-native";
import { Link } from "react-router-native";

import theme from "../theme";

interface AppBarButtonProps extends PressableProps {
  label: string;
  to: string;
}

export const appBarButtonStyles = StyleSheet.create({
  pressable: {
    marginLeft: 10,
  },
  text: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: "700",
    color: theme.colors.viewPrimaryText,
  },
});

function AppBarButton({ label, to, ...rest }: AppBarButtonProps) {
  return (
    <Pressable style={appBarButtonStyles.pressable} {...rest}>
      <Link to={to}>
        <Text style={appBarButtonStyles.text}>{label}</Text>
      </Link>
    </Pressable>
  );
}

export default AppBarButton;
