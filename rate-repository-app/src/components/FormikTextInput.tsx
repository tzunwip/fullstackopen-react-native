import { StyleSheet, TextInputProps } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";
import { PrimaryText } from "./Text";
import theme from "../theme";

interface FormikTextInputProps extends TextInputProps {
  name: string;
}

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.error,
  },
});

const FormikTextInput = ({ name, ...props }: FormikTextInputProps) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched ? meta.error : undefined;

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        placeholderTextColor="grey"
        {...props}
      />
      {showError && (
        <PrimaryText style={styles.errorText}>{meta.error}</PrimaryText>
      )}
    </>
  );
};

export default FormikTextInput;
