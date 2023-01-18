/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type AllRepositoriesOrderBy =
  | 'CREATED_AT'
  | 'RATING_AVERAGE';

export type AuthenticateInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type AuthenticatePayload = {
  __typename?: 'AuthenticatePayload';
  accessToken: Scalars['String'];
  expiresAt: Scalars['DateTime'];
  user: User;
};

export type CreateReviewInput = {
  ownerName: Scalars['String'];
  rating: Scalars['Int'];
  repositoryName: Scalars['String'];
  text?: InputMaybe<Scalars['String']>;
};

export type CreateUserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Generates a new access token, if provided credentials (username and password) match any registered user. */
  authenticate?: Maybe<AuthenticatePayload>;
  /** Creates a review for the given repository defined by repositoryName and ownerName. */
  createReview?: Maybe<Review>;
  /** Creates a new user, if the provided username does not already exist. */
  createUser?: Maybe<User>;
  /** Deletes the review which has the given id, if it is created by the authorized user. */
  deleteReview?: Maybe<Scalars['Boolean']>;
  root?: Maybe<Scalars['String']>;
};


export type MutationAuthenticateArgs = {
  credentials?: InputMaybe<AuthenticateInput>;
};


export type MutationCreateReviewArgs = {
  review?: InputMaybe<CreateReviewInput>;
};


export type MutationCreateUserArgs = {
  user?: InputMaybe<CreateUserInput>;
};


export type MutationDeleteReviewArgs = {
  id: Scalars['ID'];
};

export type OrderDirection =
  | 'ASC'
  | 'DESC';

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** Returns the authenticated user. */
  me?: Maybe<User>;
  /** Returns paginated repositories. */
  repositories: RepositoryConnection;
  /** Returns repository by an id. */
  repository?: Maybe<Repository>;
  root?: Maybe<Scalars['String']>;
  /** Returns paginated users. */
  users: UserConnection;
};


export type QueryRepositoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AllRepositoriesOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  ownerName?: InputMaybe<Scalars['String']>;
  searchKeyword?: InputMaybe<Scalars['String']>;
};


export type QueryRepositoryArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type Repository = {
  __typename?: 'Repository';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  forksCount?: Maybe<Scalars['Int']>;
  fullName: Scalars['String'];
  id: Scalars['ID'];
  language?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  openIssuesCount?: Maybe<Scalars['Int']>;
  ownerAvatarUrl?: Maybe<Scalars['String']>;
  ownerName: Scalars['String'];
  ratingAverage: Scalars['Int'];
  reviewCount: Scalars['Int'];
  reviews: ReviewConnection;
  stargazersCount?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  user: User;
  userHasReviewed?: Maybe<Scalars['Boolean']>;
  watchersCount?: Maybe<Scalars['Int']>;
};


export type RepositoryReviewsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type RepositoryConnection = {
  __typename?: 'RepositoryConnection';
  edges: Array<RepositoryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type RepositoryEdge = {
  __typename?: 'RepositoryEdge';
  cursor: Scalars['String'];
  node: Repository;
};

export type Review = {
  __typename?: 'Review';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  rating: Scalars['Int'];
  repository: Repository;
  repositoryId: Scalars['String'];
  text?: Maybe<Scalars['String']>;
  user: User;
  userId: Scalars['String'];
};

export type ReviewConnection = {
  __typename?: 'ReviewConnection';
  edges: Array<ReviewEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ReviewEdge = {
  __typename?: 'ReviewEdge';
  cursor: Scalars['String'];
  node: Review;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  reviewCount: Scalars['Int'];
  reviews: ReviewConnection;
  username: Scalars['String'];
};


export type UserReviewsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string } | null };

export type RepositoryProfileFragment = { __typename?: 'Repository', id: string, fullName: string, description?: string | null, language?: string | null, forksCount?: number | null, stargazersCount?: number | null, ratingAverage: number, reviewCount: number, ownerAvatarUrl?: string | null, url?: string | null } & { ' $fragmentName'?: 'RepositoryProfileFragment' };

export type RepositoryReviewFragment = { __typename?: 'Review', id: string, text?: string | null, rating: number, createdAt: any, user: { __typename?: 'User', id: string, username: string } } & { ' $fragmentName'?: 'RepositoryReviewFragment' };

export type GetRepositoryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetRepositoryQuery = { __typename?: 'Query', repository?: (
    { __typename?: 'Repository', reviews: { __typename?: 'ReviewConnection', edges: Array<{ __typename?: 'ReviewEdge', node: (
          { __typename?: 'Review', id: string }
          & { ' $fragmentRefs'?: { 'RepositoryReviewFragment': RepositoryReviewFragment } }
        ) }> } }
    & { ' $fragmentRefs'?: { 'RepositoryProfileFragment': RepositoryProfileFragment } }
  ) | null };

export type CreateReviewMutationVariables = Exact<{
  ownerName: Scalars['String'];
  repositoryName: Scalars['String'];
  rating: Scalars['Int'];
  text?: InputMaybe<Scalars['String']>;
}>;


export type CreateReviewMutation = { __typename?: 'Mutation', createReview?: { __typename?: 'Review', repositoryId: string } | null };

export type GetRepositoriesQueryVariables = Exact<{
  orderBy?: InputMaybe<AllRepositoriesOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  searchKeyword?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetRepositoriesQuery = { __typename?: 'Query', repositories: { __typename?: 'RepositoryConnection', edges: Array<{ __typename?: 'RepositoryEdge', node: (
        { __typename?: 'Repository', id: string }
        & { ' $fragmentRefs'?: { 'RepositoryProfileFragment': RepositoryProfileFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } };

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id: string, username: string } | null };

export type AuthenticateUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type AuthenticateUserMutation = { __typename?: 'Mutation', authenticate?: { __typename?: 'AuthenticatePayload', accessToken: string } | null };

export const RepositoryProfileFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RepositoryProfile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Repository"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"forksCount"}},{"kind":"Field","name":{"kind":"Name","value":"stargazersCount"}},{"kind":"Field","name":{"kind":"Name","value":"ratingAverage"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}},{"kind":"Field","name":{"kind":"Name","value":"ownerAvatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]} as unknown as DocumentNode<RepositoryProfileFragment, unknown>;
export const RepositoryReviewFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RepositoryReview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Review"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<RepositoryReviewFragment, unknown>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const GetRepositoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRepository"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repository"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RepositoryProfile"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"RepositoryReview"}}]}}]}}]}}]}}]}},...RepositoryProfileFragmentDoc.definitions,...RepositoryReviewFragmentDoc.definitions]} as unknown as DocumentNode<GetRepositoryQuery, GetRepositoryQueryVariables>;
export const CreateReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ownerName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repositoryName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rating"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"review"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ownerName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ownerName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"repositoryName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repositoryName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"rating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rating"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repositoryId"}}]}}]}}]} as unknown as DocumentNode<CreateReviewMutation, CreateReviewMutationVariables>;
export const GetRepositoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRepositories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AllRepositoriesOrderBy"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchKeyword"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repositories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchKeyword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchKeyword"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"RepositoryProfile"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}},...RepositoryProfileFragmentDoc.definitions]} as unknown as DocumentNode<GetRepositoriesQuery, GetRepositoriesQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const AuthenticateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthenticateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"credentials"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<AuthenticateUserMutation, AuthenticateUserMutationVariables>;