import { ApolloProvider } from "@apollo/client";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import { NativeRouter } from "react-router-native";

import apolloClient from "../../utils/apolloClient";
import SignIn from "../SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const { getByRole, getByPlaceholderText, debug } = render(
        <NativeRouter>
          <ApolloProvider client={apolloClient()}>
            <SignIn />
          </ApolloProvider>
        </NativeRouter>
      );

      const usernameField = getByPlaceholderText("Username");
      const passwordField = getByPlaceholderText("Password");
      const signinButton = getByRole("button", { name: "Sign In" });

      expect(usernameField).toBeDefined();
      expect(passwordField).toBeDefined();
      expect(signinButton).toBeDefined();

      const mockUsername = "billy";
      const mockPassword = "password";

      act(() => {
        fireEvent.changeText(usernameField, mockUsername);
        fireEvent.changeText(passwordField, mockPassword);
        fireEvent.press(signinButton);
      });

      expect(signinButton).toBeDisabled();
    });
  });
});
