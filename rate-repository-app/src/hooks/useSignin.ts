import { FormikHelpers } from "formik";
import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import { storeData } from "../utils/asyncStore";
import { Values } from "../components/SignIn";
import { useNavigate } from "react-router-native";

function useSignin() {
  const navigate = useNavigate();
  const [authenticateUser] = useMutation(AUTHENTICATE, {
    onCompleted: () => navigate("/", { replace: true }),
  });

  async function submitCredentials(
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) {
    const { username, password } = values;
    try {
      const res = await authenticateUser({
        variables: { username, password },
      });
      storeData("accessToken", res?.data?.authenticate?.accessToken);
      console.log("token", res?.data?.authenticate?.accessToken);
    } catch (error: unknown) {
      if (error instanceof Error) throw Error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return [submitCredentials];
}

export default useSignin;
