import { TextProps, StyleSheet, View } from "react-native";
import { PrimaryText, SecondaryText } from "./Text";

interface StatProps extends TextProps {
  label: string;
  value: number;
}

const statStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 10,
  },
  textPrimary: {
    marginBottom: 5,
  },
});

function formatNumber(num: number) {
  return Intl.NumberFormat("en", { notation: "compact" }).format(num);
}

function Stat({ label, value }: StatProps) {
  return (
    <View style={statStyles.container}>
      <PrimaryText style={statStyles.textPrimary}>
        {formatNumber(value)}
      </PrimaryText>
      <SecondaryText>{label}</SecondaryText>
    </View>
  );
}

export default Stat;
