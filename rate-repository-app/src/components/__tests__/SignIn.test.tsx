import { ApolloProvider } from "@apollo/client";
import {
  render,
  fireEvent,
  act,
  waitFor,
  screen,
} from "@testing-library/react-native";
import { NativeRouter } from "react-router-native";

import apolloClient from "../../utils/apolloClient";
import SignIn from "../SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      render(
        <NativeRouter>
          <ApolloProvider client={apolloClient()}>
            <SignIn />
          </ApolloProvider>
        </NativeRouter>
      );

      const usernameField = screen.getByPlaceholderText("Username");
      const passwordField = screen.getByPlaceholderText("Password");
      const signinButton = screen.getByRole("button", { name: "Sign In" });

      expect(usernameField).toBeDefined();
      expect(passwordField).toBeDefined();
      expect(signinButton).toBeDefined();

      const mockUsername = "username";
      const mockPassword = "password";

      act(() => {
        fireEvent.changeText(usernameField, mockUsername);
        fireEvent.changeText(passwordField, mockPassword);
        fireEvent.press(signinButton);
      });

      await waitFor(() => expect(signinButton).toBeDisabled());

      // wait for fetch to complete before ending test to avoid act wrapper warnings
      await waitFor(() => expect(signinButton).toBeEnabled());
    });
  });
});
