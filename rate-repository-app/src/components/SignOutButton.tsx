import { useApolloClient } from "@apollo/client";
import { Pressable, Text } from "react-native";
import { useNavigate } from "react-router-native";
import { removeStore } from "../utils/asyncStore";
import { appBarButtonStyles } from "./AppBarButton";

function SignOutButton() {
  const { cache } = useApolloClient();
  const navigate = useNavigate();

  async function handleSignOut() {
    await cache.reset();
    await removeStore("accessToken");
    navigate("/signin");
  }

  return (
    <Pressable style={appBarButtonStyles.pressable} onPress={handleSignOut}>
      <Text style={appBarButtonStyles.text}>Sign Out</Text>
    </Pressable>
  );
}

export default SignOutButton;
