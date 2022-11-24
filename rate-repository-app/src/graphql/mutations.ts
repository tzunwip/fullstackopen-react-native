import { gql } from "../__generated__";

export const AUTHENTICATE = gql(/* GraphQL */ `
  mutation AuthenticateUser($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`);
