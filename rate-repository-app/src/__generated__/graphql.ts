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

export enum AllRepositoriesOrderBy {
  CreatedAt = 'CREATED_AT',
  RatingAverage = 'RATING_AVERAGE'
}

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

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

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

export type RepositoryItemFragment = { __typename?: 'Repository', id: string, fullName: string, description?: string | null, language?: string | null, forksCount?: number | null, stargazersCount?: number | null, ratingAverage: number, reviewCount: number, ownerAvatarUrl?: string | null } & { ' $fragmentName'?: 'RepositoryItemFragment' };

export type GetRepositoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRepositoriesQuery = { __typename?: 'Query', repositories: { __typename?: 'RepositoryConnection', edges: Array<{ __typename?: 'RepositoryEdge', node: (
        { __typename?: 'Repository' }
        & { ' $fragmentRefs'?: { 'RepositoryItemFragment': RepositoryItemFragment } }
      ) }> } };

export const RepositoryItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RepositoryItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Repository"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"forksCount"}},{"kind":"Field","name":{"kind":"Name","value":"stargazersCount"}},{"kind":"Field","name":{"kind":"Name","value":"ratingAverage"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}},{"kind":"Field","name":{"kind":"Name","value":"ownerAvatarUrl"}}]}}]} as unknown as DocumentNode<RepositoryItemFragment, unknown>;
export const GetRepositoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRepositories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repositories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RepositoryItem"}}]}}]}}]}}]}},...RepositoryItemFragmentDoc.definitions]} as unknown as DocumentNode<GetRepositoriesQuery, GetRepositoriesQueryVariables>;