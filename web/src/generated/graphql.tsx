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
  reports: Report;
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

export type CreateReportInput = {
  bank: Scalars['String'];
  link: Scalars['String'];
  quarter: Scalars['String'];
  year: Scalars['String'];
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
  increaseDownloadCount: Scalars['Boolean'];
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
  options: CreateReportInput;
};


export type MutationDeleteBankArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteReportArgs = {
  id: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationIncreaseDownloadCountArgs = {
  id: Scalars['Int'];
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

export type PaginatedReports = {
  __typename?: 'PaginatedReports';
  hasMore: Scalars['Boolean'];
  reports: Array<Report>;
};

export type Query = {
  __typename?: 'Query';
  bank?: Maybe<Bank>;
  banks: Array<Bank>;
  me?: Maybe<User>;
  report?: Maybe<Report>;
  reports: PaginatedReports;
};


export type QueryBankArgs = {
  id: Scalars['Float'];
};


export type QueryReportArgs = {
  id: Scalars['Int'];
};


export type QueryReportsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type Report = {
  __typename?: 'Report';
  bank: Bank;
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

export type RegularReportResponseFragment = { __typename?: 'Report', id: number, year: string, quarter: string, link: string, downloadCount: number, bankId: number, createdAt: string, updatedAt: string };

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

export type CreateReportMutationVariables = Exact<{
  options: CreateReportInput;
}>;


export type CreateReportMutation = { __typename?: 'Mutation', createReport: { __typename?: 'Report', id: number, year: string, quarter: string, link: string, downloadCount: number, bankId: number, createdAt: string, updatedAt: string } };

export type DeleteReportMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteReportMutation = { __typename?: 'Mutation', deleteReport?: boolean | null | undefined };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type IncreaseDownloadCountMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type IncreaseDownloadCountMutation = { __typename?: 'Mutation', increaseDownloadCount: boolean };

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

export type ReportQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ReportQuery = { __typename?: 'Query', report?: { __typename?: 'Report', id: number, year: string, quarter: string, link: string, downloadCount: number, bankId: number, createdAt: string, updatedAt: string, bank: { __typename?: 'Bank', id: number, name: string, continent: string, country: string, website: string } } | null | undefined };

export type ReportsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type ReportsQuery = { __typename?: 'Query', reports: { __typename?: 'PaginatedReports', hasMore: boolean, reports: Array<{ __typename?: 'Report', id: number, year: string, quarter: string, link: string, downloadCount: number, bankId: number, createdAt: string, updatedAt: string, bank: { __typename?: 'Bank', id: number, name: string, continent: string, country: string, website: string } }> } };

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
export const RegularReportResponseFragmentDoc = gql`
    fragment RegularReportResponse on Report {
  id
  year
  quarter
  link
  downloadCount
  bankId
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
export const CreateReportDocument = gql`
    mutation CreateReport($options: CreateReportInput!) {
  createReport(options: $options) {
    ...RegularReportResponse
  }
}
    ${RegularReportResponseFragmentDoc}`;

export function useCreateReportMutation() {
  return Urql.useMutation<CreateReportMutation, CreateReportMutationVariables>(CreateReportDocument);
};
export const DeleteReportDocument = gql`
    mutation DeleteReport($id: Int!) {
  deleteReport(id: $id)
}
    `;

export function useDeleteReportMutation() {
  return Urql.useMutation<DeleteReportMutation, DeleteReportMutationVariables>(DeleteReportDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const IncreaseDownloadCountDocument = gql`
    mutation IncreaseDownloadCount($id: Int!) {
  increaseDownloadCount(id: $id)
}
    `;

export function useIncreaseDownloadCountMutation() {
  return Urql.useMutation<IncreaseDownloadCountMutation, IncreaseDownloadCountMutationVariables>(IncreaseDownloadCountDocument);
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
export const ReportDocument = gql`
    query Report($id: Int!) {
  report(id: $id) {
    id
    year
    quarter
    link
    downloadCount
    bankId
    bank {
      id
      name
      continent
      country
      website
    }
    createdAt
    updatedAt
  }
}
    `;

export function useReportQuery(options: Omit<Urql.UseQueryArgs<ReportQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ReportQuery>({ query: ReportDocument, ...options });
};
export const ReportsDocument = gql`
    query Reports($limit: Int!, $cursor: String) {
  reports(limit: $limit, cursor: $cursor) {
    hasMore
    reports {
      id
      year
      quarter
      link
      downloadCount
      bankId
      bank {
        id
        name
        continent
        country
        website
      }
      createdAt
      updatedAt
    }
  }
}
    `;

export function useReportsQuery(options: Omit<Urql.UseQueryArgs<ReportsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ReportsQuery>({ query: ReportsDocument, ...options });
};