import { useField } from "formik";
import { StyleSheet, TextInputProps } from "react-native";

import theme from "../theme";
import { PrimaryText } from "./Text";
import TextInput from "./TextInput";

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

export const FormikNumberInput = ({ name, ...props }: FormikTextInputProps) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched ? meta.error : undefined;

  return (
    <>
      <TextInput
        onChangeText={(value) =>
          helpers.setValue(value === "" ? undefined : Number(value))
        }
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        placeholderTextColor="grey"
        keyboardType="numeric"
        {...props}
      />
      {showError && (
        <PrimaryText style={styles.errorText}>{meta.error}</PrimaryText>
      )}
    </>
  );
};

export default FormikTextInput;
