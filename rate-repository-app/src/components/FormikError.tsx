import { Text, StyleSheet, TextProps } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.red,
  },
});

interface FormikErrorProps extends TextProps {
  errorMessage: string;
}

function FormikError({ errorMessage, ...props }: FormikErrorProps) {
  return (
    <Text style={styles.text} {...props}>
      {errorMessage}
    </Text>
  );
}

export default FormikError;
