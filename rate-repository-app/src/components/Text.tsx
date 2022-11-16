import { TextProps, Text } from "react-native";
import theme from "../theme";

export function PrimaryText({ style, ...props }: TextProps) {
  const primaryTextStyles = [{ color: theme.colors.textPrimary }, style];
  return <Text style={primaryTextStyles} {...props} />;
}

export function SecondaryText({ style, ...props }: TextProps) {
  const secondaryTextStyles = [{ color: theme.colors.textSecondary }, style];
  return <Text style={secondaryTextStyles} {...props} />;
}
