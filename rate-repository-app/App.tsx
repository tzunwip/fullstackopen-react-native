import { ApolloProvider } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { NativeRouter } from "react-router-native";

import Main from "./src/components/Main";
import createApolloClient from "./src/utils/apolloClient";

const apolloClient = createApolloClient();

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <PaperProvider>
            <Main />
          </PaperProvider>
        </ApolloProvider>
      </NativeRouter>
    </>
  );
};

export default App;
