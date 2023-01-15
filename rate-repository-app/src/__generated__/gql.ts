/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  fragment RepositoryItem on Repository {\n    id\n    fullName\n    description\n    language\n    forksCount\n    stargazersCount\n    ratingAverage\n    reviewCount\n    ownerAvatarUrl\n    url\n  }\n": types.RepositoryItemFragmentDoc,
    "\n  fragment Me on User {\n    id\n    username\n  }\n": types.MeFragmentDoc,
    "\n  mutation AuthenticateUser($username: String!, $password: String!) {\n    authenticate(credentials: { username: $username, password: $password }) {\n      accessToken\n    }\n  }\n": types.AuthenticateUserDocument,
    "\n  query GetRepositories {\n    repositories {\n      edges {\n        node {\n          ...RepositoryItem\n        }\n      }\n    }\n  }\n": types.GetRepositoriesDocument,
    "\n  query GetRepository($id: ID!) {\n    repository(id: $id) {\n      ...RepositoryItem\n    }\n  }\n": types.GetRepositoryDocument,
    "\n  query Me {\n    me {\n      ...Me\n    }\n  }\n": types.MeDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment RepositoryItem on Repository {\n    id\n    fullName\n    description\n    language\n    forksCount\n    stargazersCount\n    ratingAverage\n    reviewCount\n    ownerAvatarUrl\n    url\n  }\n"): (typeof documents)["\n  fragment RepositoryItem on Repository {\n    id\n    fullName\n    description\n    language\n    forksCount\n    stargazersCount\n    ratingAverage\n    reviewCount\n    ownerAvatarUrl\n    url\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment Me on User {\n    id\n    username\n  }\n"): (typeof documents)["\n  fragment Me on User {\n    id\n    username\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AuthenticateUser($username: String!, $password: String!) {\n    authenticate(credentials: { username: $username, password: $password }) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation AuthenticateUser($username: String!, $password: String!) {\n    authenticate(credentials: { username: $username, password: $password }) {\n      accessToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetRepositories {\n    repositories {\n      edges {\n        node {\n          ...RepositoryItem\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetRepositories {\n    repositories {\n      edges {\n        node {\n          ...RepositoryItem\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetRepository($id: ID!) {\n    repository(id: $id) {\n      ...RepositoryItem\n    }\n  }\n"): (typeof documents)["\n  query GetRepository($id: ID!) {\n    repository(id: $id) {\n      ...RepositoryItem\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Me {\n    me {\n      ...Me\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      ...Me\n    }\n  }\n"];

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function gql(source: string): unknown;

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;