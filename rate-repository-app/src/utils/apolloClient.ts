import {
  ApolloClient,
  InMemoryCache,
  GraphQLRequest,
  HttpLink,
  concat,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCAL_IP } from "@env";

import { getStore } from "./asyncStore";

interface ApolloContext {
  headers: {
    authorization: `Bearer ${string}` | "";
  };
}

const authMiddleware = setContext(setAsyncHeaders);

async function setAsyncHeaders(_: GraphQLRequest, ctx: ApolloContext) {
  const storedToken = await getStore("accessToken");

  return {
    ...ctx,
    headers: {
      authorization: storedToken ? `Bearer ${storedToken}` : "",
    },
  };
}

const httpLink = new HttpLink({
  uri: LOCAL_IP,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
