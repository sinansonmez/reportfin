import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
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

export type CreateBankInput = {
  continent: Scalars['String'];
  country: Scalars['String'];
  logo: Scalars['String'];
  name: Scalars['String'];
  website: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createBank: Bank;
  createReport: Report;
  deleteBank?: Maybe<Scalars['Boolean']>;
  deleteReport?: Maybe<Scalars['Boolean']>;
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updateBank?: Maybe<Bank>;
  updateReport?: Maybe<Report>;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateBankArgs = {
  options: CreateBankInput;
};


export type MutationCreateReportArgs = {
  bank: Scalars['String'];
  link: Scalars['String'];
  quarter: Scalars['String'];
  year: Scalars['String'];
};


export type MutationDeleteBankArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteReportArgs = {
  id: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdateBankArgs = {
  id: Scalars['Float'];
  logo: Scalars['String'];
};


export type MutationUpdateReportArgs = {
  id: Scalars['Float'];
  link: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  bank?: Maybe<Bank>;
  banks: Array<Bank>;
  me?: Maybe<User>;
  report?: Maybe<Report>;
  reports: Array<Report>;
};


export type QueryBankArgs = {
  id: Scalars['Float'];
};


export type QueryReportArgs = {
  id: Scalars['Float'];
};

export type Report = {
  __typename?: 'Report';
  bankId: Scalars['Float'];
  createdAt: Scalars['String'];
  downloadCount: Scalars['Float'];
  id: Scalars['Float'];
  link: Scalars['String'];
  quarter: Scalars['String'];
  updatedAt: Scalars['String'];
  year: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
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
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegularBankResponseFragment = { __typename?: 'Bank', id: number, name: string, continent: string, country: string, logo: string, website: string, createdAt: string, updatedAt: string };

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string } | null | undefined };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string } | null | undefined } };

export type CreateBankMutationVariables = Exact<{
  options: CreateBankInput;
}>;


export type CreateBankMutation = { __typename?: 'Mutation', createBank: { __typename?: 'Bank', id: number, name: string, continent: string, country: string, logo: string, website: string, createdAt: string, updatedAt: string } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string } | null | undefined } };

export type BanksQueryVariables = Exact<{ [key: string]: never; }>;


export type BanksQuery = { __typename?: 'Query', banks: Array<{ __typename?: 'Bank', id: number, name: string, continent: string, country: string, logo: string, website: string, createdAt: string, updatedAt: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string } | null | undefined };

export const RegularBankResponseFragmentDoc = gql`
    fragment RegularBankResponse on Bank {
  id
  name
  continent
  country
  logo
  website
  createdAt
  updatedAt
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateBankDocument = gql`
    mutation CreateBank($options: CreateBankInput!) {
  createBank(options: $options) {
    ...RegularBankResponse
  }
}
    ${RegularBankResponseFragmentDoc}`;

export function useCreateBankMutation() {
  return Urql.useMutation<CreateBankMutation, CreateBankMutationVariables>(CreateBankDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const BanksDocument = gql`
    query Banks {
  banks {
    id
    name
    continent
    country
    logo
    website
    createdAt
    updatedAt
  }
}
    `;

export function useBanksQuery(options: Omit<Urql.UseQueryArgs<BanksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<BanksQuery>({ query: BanksDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};