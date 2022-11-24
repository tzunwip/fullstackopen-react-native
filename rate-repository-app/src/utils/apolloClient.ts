import { ApolloClient, InMemoryCache } from "@apollo/client";
import { LOCAL_IP } from "@env";

const createApolloClient = () => {
  return new ApolloClient({
    uri: LOCAL_IP,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
