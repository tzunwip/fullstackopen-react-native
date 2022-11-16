import { SafeAreaView } from "react-native";
import { NativeRouter } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import Main from "./src/components/Main";

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <NativeRouter>
        <Main />
      </NativeRouter>
    </SafeAreaView>
  );
};

export default App;
