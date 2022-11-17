import { FieldMetaProps } from "formik";
import {
  TextInput as NativeTextInput,
  StyleSheet,
  TextInputProps as NativeTextInputProps,
} from "react-native";
import theme from "../theme";

type TextInputProps = NativeTextInputProps &
  Pick<FieldMetaProps<Record<string, string>>, "error">;

const styles = StyleSheet.create({
  error: {
    borderColor: theme.colors.error,
    color: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }: TextInputProps) => {
  const textInputStyle = [style, error && styles.error];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
