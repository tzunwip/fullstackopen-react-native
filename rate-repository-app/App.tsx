import { NativeRouter } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import Main from "./src/components/Main";

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <NativeRouter>
        <Main />
      </NativeRouter>
    </>
  );
};

export default App;
