import { Formik, FormikProps } from "formik";
import { StyleSheet, Text, View, Pressable } from "react-native";
import * as z from "zod";

import useSignUp from "../hooks/useSignUp";
import theme from "../theme";
import { toFormikValidationSchema } from "../utils/zod-formik-adapter";
import FormikError from "./FormikError";
import FormikTextInput from "./FormikTextInput";

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
  successText: {
    fontWeight: "400",
    fontSize: 20,
  },
});

const initialValues = {
  username: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = z
  .object({
    username: z
      .string({ required_error: "Username is required" })
      .min(1, { message: "Minimum length 1 character" })
      .max(30, { message: "Maximum length 30 characters" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(5, { message: "Minimum length 5 characters" })
      .max(50, { message: "Maximum length 50 characters" }),
    confirmPassword: z.string({
      required_error: "Password confirmation is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpUserValues = z.infer<typeof validationSchema>;

function SignUp() {
  const [handleSignUp, isSignupSuccessful] = useSignUp();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validationSchema)}
      onSubmit={handleSignUp}
    >
      {({ submitForm, status }: FormikProps<SignUpUserValues>) => (
        <View style={styles.form}>
          {isSignupSuccessful ? (
            <Text style={styles.successText}>Sign up successful!</Text>
          ) : (
            <>
              <FormikTextInput
                name="username"
                placeholder="Username"
                style={styles.textInput}
              />
              <FormikTextInput
                name="password"
                placeholder="Password"
                secureTextEntry
                style={styles.textInput}
              />
              <FormikTextInput
                name="confirmPassword"
                placeholder="Password Confirmation"
                secureTextEntry
                style={styles.textInput}
              />
              <Pressable
                accessibilityRole="button"
                onPress={submitForm}
                style={styles.submitButton}
              >
                <Text style={styles.submitText}>Sign Up</Text>
              </Pressable>
              {status?.errorMessage && (
                <FormikError errorMessage={status.errorMessage} />
              )}
            </>
          )}
        </View>
      )}
    </Formik>
  );
}

export default SignUp;
