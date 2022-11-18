import { Text, Pressable, View, StyleSheet } from "react-native";
import { Formik, FormikHelpers, FormikProps } from "formik";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import z from "zod";
import { toFormikValidationSchema } from "../zod-formik-adapter";

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
  function submitFormik(
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) {
    console.log(values);
    setSubmitting(false);
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitFormik}
      validationSchema={toFormikValidationSchema(validationSchema)}
    >
      {({ submitForm }: FormikProps<Values>) => (
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
          <Pressable style={styles.submitButton} onPress={submitForm}>
            <Text style={styles.submitText}>Sign In</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
}

export default SignIn;
