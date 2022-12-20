import { Formik, FormikProps } from "formik";
import { Text, Pressable, View, StyleSheet } from "react-native";
import z from "zod";

import useSignin from "../hooks/useSignin";
import theme from "../theme";
import { toFormikValidationSchema } from "../utils/zod-formik-adapter";
import FormikTextInput from "./FormikTextInput";

const initialValues = {
  username: "",
  password: "",
};

export type Values = typeof initialValues;

const validationSchema = z.object({
  username: z.string({ required_error: "Username is required" }),
  password: z.string({ required_error: "Password is required" }),
});

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
  const [submitCredentials] = useSignin();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitCredentials}
      validationSchema={toFormikValidationSchema(validationSchema)}
    >
      {({ submitForm, isSubmitting }: FormikProps<Values>) => (
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
          <Pressable
            accessibilityRole="button"
            style={styles.submitButton}
            onPress={submitForm}
            disabled={isSubmitting}
          >
            <Text style={styles.submitText}>Sign In</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
}

export default SignIn;
