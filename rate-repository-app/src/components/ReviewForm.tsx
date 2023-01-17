import { Formik } from "formik";
import { StyleSheet, Pressable, View, Text } from "react-native";
import * as z from "zod";

import useCreateReview from "../hooks/useCreateReview";
import theme from "../theme";
import { toFormikValidationSchema } from "../utils/zod-formik-adapter";
import FormikError from "./FormikError";
import FormikTextInput, { FormikNumberInput } from "./FormikTextInput";

const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  textInput: {
    flex: 1,
    maxHeight: 30,
    minWidth: 300,
    padding: 5,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 3,
    margin: 5,
  },
  multilineTextInput: {
    minHeight: 60,
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

const validationSchema = z.object({
  ownerName: z.string({ required_error: "Repository owner name is required" }),
  repositoryName: z.string({ required_error: "Repository name is required" }),
  rating: z
    .number({
      required_error: "Rating is required",
      invalid_type_error: "Rating must be a number",
    })
    .min(0)
    .max(100),
  text: z.string().optional(),
});

export type ReviewValues = z.infer<typeof validationSchema>;

const initialValues: ReviewValues = {
  ownerName: "",
  repositoryName: "",
  rating: "" as unknown as number,
  text: "",
};

function ReviewForm() {
  const [submitReview] = useCreateReview();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validationSchema)}
      onSubmit={submitReview}
    >
      {({ submitForm, isSubmitting, isValid, status }) => (
        <View style={styles.form}>
          <FormikTextInput
            style={styles.textInput}
            name="ownerName"
            placeholder="Repository owner name"
          />
          <FormikTextInput
            style={styles.textInput}
            name="repositoryName"
            placeholder="Repository name"
          />
          <FormikNumberInput
            style={styles.textInput}
            name="rating"
            placeholder="Rating between 0 and 100"
          />
          <FormikTextInput
            style={styles.multilineTextInput}
            name="text"
            placeholder="Review"
            multiline
          />
          <Pressable
            accessibilityRole="button"
            style={{
              ...styles.submitButton,
              backgroundColor:
                isSubmitting || !isValid ? "grey" : theme.colors.viewSecondary,
            }}
            onPress={submitForm}
            disabled={isSubmitting || !isValid}
          >
            <Text style={styles.submitText}>Submit Review</Text>
          </Pressable>
          {status?.errorMessage && (
            <FormikError errorMessage={status.errorMessage} />
          )}
        </View>
      )}
    </Formik>
  );
}

export default ReviewForm;
