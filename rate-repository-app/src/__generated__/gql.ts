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
    "\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n": types.MeDocument,
    "\n  fragment RepositoryProfile on Repository {\n    id\n    fullName\n    description\n    language\n    forksCount\n    stargazersCount\n    ratingAverage\n    reviewCount\n    ownerAvatarUrl\n    url\n  }\n": types.RepositoryProfileFragmentDoc,
    "\n  fragment RepositoryReview on Review {\n    id\n    text\n    rating\n    createdAt\n    user {\n      id\n      username\n    }\n  }\n": types.RepositoryReviewFragmentDoc,
    "\n  mutation CreateReview(\n    $ownerName: String!\n    $repositoryName: String!\n    $rating: Int!\n    $text: String\n  ) {\n    createReview(\n      review: {\n        ownerName: $ownerName\n        repositoryName: $repositoryName\n        rating: $rating\n        text: $text\n      }\n    ) {\n      repositoryId\n    }\n  }\n": types.CreateReviewDocument,
    "\n  query GetRepositories(\n    $orderBy: AllRepositoriesOrderBy\n    $orderDirection: OrderDirection\n    $searchKeyword: String\n    $first: Int\n    $after: String\n  ) {\n    repositories(\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      searchKeyword: $searchKeyword\n      first: $first\n      after: $after\n    ) {\n      edges {\n        node {\n          id\n          ...RepositoryProfile\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": types.GetRepositoriesDocument,
    "\n  query GetRepository($id: ID!, $first: Int, $after: String) {\n    repository(id: $id) {\n      ...RepositoryProfile\n      reviews(first: $first, after: $after) {\n        edges {\n          node {\n            id\n            ...RepositoryReview\n          }\n        }\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n      }\n    }\n  }\n": types.GetRepositoryDocument,
    "\n  mutation CreateUser($username: String!, $password: String!) {\n    createUser(user: { username: $username, password: $password }) {\n      id\n      username\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation AuthenticateUser($username: String!, $password: String!) {\n    authenticate(credentials: { username: $username, password: $password }) {\n      accessToken\n    }\n  }\n": types.AuthenticateUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment RepositoryProfile on Repository {\n    id\n    fullName\n    description\n    language\n    forksCount\n    stargazersCount\n    ratingAverage\n    reviewCount\n    ownerAvatarUrl\n    url\n  }\n"): (typeof documents)["\n  fragment RepositoryProfile on Repository {\n    id\n    fullName\n    description\n    language\n    forksCount\n    stargazersCount\n    ratingAverage\n    reviewCount\n    ownerAvatarUrl\n    url\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment RepositoryReview on Review {\n    id\n    text\n    rating\n    createdAt\n    user {\n      id\n      username\n    }\n  }\n"): (typeof documents)["\n  fragment RepositoryReview on Review {\n    id\n    text\n    rating\n    createdAt\n    user {\n      id\n      username\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateReview(\n    $ownerName: String!\n    $repositoryName: String!\n    $rating: Int!\n    $text: String\n  ) {\n    createReview(\n      review: {\n        ownerName: $ownerName\n        repositoryName: $repositoryName\n        rating: $rating\n        text: $text\n      }\n    ) {\n      repositoryId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateReview(\n    $ownerName: String!\n    $repositoryName: String!\n    $rating: Int!\n    $text: String\n  ) {\n    createReview(\n      review: {\n        ownerName: $ownerName\n        repositoryName: $repositoryName\n        rating: $rating\n        text: $text\n      }\n    ) {\n      repositoryId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetRepositories(\n    $orderBy: AllRepositoriesOrderBy\n    $orderDirection: OrderDirection\n    $searchKeyword: String\n    $first: Int\n    $after: String\n  ) {\n    repositories(\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      searchKeyword: $searchKeyword\n      first: $first\n      after: $after\n    ) {\n      edges {\n        node {\n          id\n          ...RepositoryProfile\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetRepositories(\n    $orderBy: AllRepositoriesOrderBy\n    $orderDirection: OrderDirection\n    $searchKeyword: String\n    $first: Int\n    $after: String\n  ) {\n    repositories(\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      searchKeyword: $searchKeyword\n      first: $first\n      after: $after\n    ) {\n      edges {\n        node {\n          id\n          ...RepositoryProfile\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetRepository($id: ID!, $first: Int, $after: String) {\n    repository(id: $id) {\n      ...RepositoryProfile\n      reviews(first: $first, after: $after) {\n        edges {\n          node {\n            id\n            ...RepositoryReview\n          }\n        }\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetRepository($id: ID!, $first: Int, $after: String) {\n    repository(id: $id) {\n      ...RepositoryProfile\n      reviews(first: $first, after: $after) {\n        edges {\n          node {\n            id\n            ...RepositoryReview\n          }\n        }\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($username: String!, $password: String!) {\n    createUser(user: { username: $username, password: $password }) {\n      id\n      username\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($username: String!, $password: String!) {\n    createUser(user: { username: $username, password: $password }) {\n      id\n      username\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AuthenticateUser($username: String!, $password: String!) {\n    authenticate(credentials: { username: $username, password: $password }) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation AuthenticateUser($username: String!, $password: String!) {\n    authenticate(credentials: { username: $username, password: $password }) {\n      accessToken\n    }\n  }\n"];

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