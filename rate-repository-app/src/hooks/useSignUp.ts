import { useMutation } from "@apollo/client";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-native";

import { gql } from "../__generated__";
import { SignUpUserValues } from "../components/SignUp";

const CREATE_USER = gql(/* GraphQL */ `
  mutation CreateUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id
      username
    }
  }
`);

function useSignUp() {
  const navigate = useNavigate();
  const [createUser] = useMutation(CREATE_USER);
  const [isSignupSuccessful, setSignupSuccessful] = useState<boolean>(false);

  async function handleSignUp<T extends SignUpUserValues>(
    values: T,
    { setStatus }: FormikHelpers<T>
  ) {
    try {
      await createUser({
        variables: values,
      });
      setSignupSuccessful(true);
      setTimeout(() => navigate("/signin"), 3000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setStatus({ errorMessage: err.message });
      }
    }
  }

  return [handleSignUp, isSignupSuccessful] as const;
}

export default useSignUp;
