import { useMutation } from "@apollo/client";
import { FormikHelpers } from "formik";
import { useNavigate } from "react-router-native";

import { Values } from "../components/SignIn";
import { AUTHENTICATE } from "../graphql/mutations";
import { setStore } from "../utils/asyncStore";

function useSignin() {
  const navigate = useNavigate();
  const [authenticateUser, { client }] = useMutation(AUTHENTICATE);

  async function submitCredentials(
    values: Values,
    { setErrors }: FormikHelpers<Values>
  ) {
    const { username, password } = values;

    try {
      const res = await authenticateUser({
        variables: { username, password },
      });
      await setStore("accessToken", res?.data?.authenticate?.accessToken);
      await client.resetStore();
      navigate("/", { replace: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors({ username: "", password: error.message });
      }
    }
  }

  return [submitCredentials];
}

export default useSignin;
