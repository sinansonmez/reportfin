import gql from 'graphql-tag';
import * as Urql from 'urql';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Bank = {
  __typename?: 'Bank';
  continent: Scalars['String'];
  country: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  logo: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
  website: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBank: Bank;
  deleteBank?: Maybe<Scalars['Boolean']>;
  login: UserResponse;
  register: UserResponse;
  updateBank?: Maybe<Bank>;
};


export type MutationCreateBankArgs = {
  continent: Scalars['String'];
  country: Scalars['String'];
  logo: Scalars['String'];
  name: Scalars['String'];
  website: Scalars['String'];
};


export type MutationDeleteBankArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdateBankArgs = {
  id: Scalars['Float'];
  logo: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  bank?: Maybe<Bank>;
  banks: Array<Bank>;
  hello: Scalars['String'];
  me?: Maybe<User>;
};


export type QueryBankArgs = {
  id: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type LoginMutation = {__typename?: 'Mutation', login: {__typename?: 'UserResponse', errors?: Array<{__typename?: 'FieldError', field: string, message: string}> | null | undefined, user?: {__typename?: 'User', id: number, username: string} | null | undefined}};

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = {__typename?: 'Mutation', register: {__typename?: 'UserResponse', errors?: Array<{__typename?: 'FieldError', field: string, message: string}> | null | undefined, user?: {__typename?: 'User', id: number, username: string} | null | undefined}};

export type MeQueryVariables = Exact<{[key: string]: never;}>;


export type MeQuery = {__typename?: 'Query', me?: {__typename?: 'User', id: number, username: string} | null | undefined};


export const LoginDocument = gql`
    mutation Login($options: UsernamePasswordInput!) {
        login(options: $options) {
            errors {
                field
                message
            }
            user {
                id
                username
            }
        }
    }
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
        register(options: $options) {
            errors {
                field
                message
            }
            user {
                id
                username
            }
        }
    }
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
        me {
            id
            username
        }
    }
`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({query: MeDocument, ...options});
};