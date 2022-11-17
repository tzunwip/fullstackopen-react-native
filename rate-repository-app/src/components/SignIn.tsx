import {
  Text,
  Pressable,
  View,
  GestureResponderEvent,
  StyleSheet,
} from "react-native";
import { Formik, FormikHelpers, FormikProps } from "formik";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";

const initialValues = {
  username: "",
  password: "",
};

export type Values = typeof initialValues;
type RNFormikProps<T> = {
  handleSubmit: (event: GestureResponderEvent) => void;
} & FormikProps<T>;

const styles = StyleSheet.create({
  form: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  textInput: {
    height: 30,
    width: 300,
    padding: 5,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 3,
    margin: 5,
  },
  submitButton: {
    height: 30,
    width: 300,
    backgroundColor: theme.colors.viewSecondary,
    borderRadius: 3,
    margin: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "white",
  },
});

function SignIn() {
  function submitFormik(
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) {
    console.log(values);
    setSubmitting(false);
  }

  return (
    <Formik initialValues={initialValues} onSubmit={submitFormik}>
      {({ handleSubmit }: RNFormikProps<Values>) => (
        <View style={styles.form}>
          <FormikTextInput
            style={styles.textInput}
            name="username"
            placeholder="Username"
          />
          <FormikTextInput
            style={styles.textInput}
            name="password"
            placeholder="Password"
            secureTextEntry
          />
          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Sign In</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
}

export default SignIn;
