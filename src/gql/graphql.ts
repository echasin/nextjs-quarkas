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
  /** Scalar for BigDecimal */
  BigDecimal: any;
  /** Scalar for BigInteger */
  BigInteger: any;
};

export type Department = {
  __typename?: 'Department';
  employees?: Maybe<Array<Maybe<Employee>>>;
  id?: Maybe<Scalars['BigInteger']>;
  name?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
};

export type DepartmentInputInput = {
  id?: InputMaybe<Scalars['BigInteger']>;
  name?: InputMaybe<Scalars['String']>;
  organizationId?: InputMaybe<Scalars['BigInteger']>;
};

export type Employee = {
  __typename?: 'Employee';
  age: Scalars['Int'];
  department?: Maybe<Department>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['BigInteger']>;
  lastName?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  position?: Maybe<Scalars['String']>;
  salary: Scalars['Int'];
};

export type EmployeeFilterInput = {
  age?: InputMaybe<FilterFieldInput>;
  position?: InputMaybe<FilterFieldInput>;
  salary?: InputMaybe<FilterFieldInput>;
};

export type FilterFieldInput = {
  operator?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** Mutation root */
export type Mutation = {
  __typename?: 'Mutation';
  deleteDepartment: Scalars['Boolean'];
  deleteStudent: Scalars['Boolean'];
  newDepartment?: Maybe<Department>;
  newOrganization?: Maybe<Organization>;
  newStudent?: Maybe<Student>;
  updateDepartment: Scalars['Int'];
  updateStudent: Scalars['Int'];
};


/** Mutation root */
export type MutationDeleteDepartmentArgs = {
  departmentId: Scalars['BigInteger'];
};


/** Mutation root */
export type MutationDeleteStudentArgs = {
  studentId: Scalars['BigInteger'];
};


/** Mutation root */
export type MutationNewDepartmentArgs = {
  data?: InputMaybe<DepartmentInputInput>;
};


/** Mutation root */
export type MutationNewOrganizationArgs = {
  data?: InputMaybe<OrganizationInputInput>;
};


/** Mutation root */
export type MutationNewStudentArgs = {
  values?: InputMaybe<StudentInputInput>;
};


/** Mutation root */
export type MutationUpdateDepartmentArgs = {
  data?: InputMaybe<DepartmentInputInput>;
};


/** Mutation root */
export type MutationUpdateStudentArgs = {
  data?: InputMaybe<StudentInputInput>;
};

export type Organization = {
  __typename?: 'Organization';
  departments?: Maybe<Array<Maybe<Department>>>;
  employees?: Maybe<Array<Maybe<Employee>>>;
  id?: Maybe<Scalars['BigInteger']>;
  name?: Maybe<Scalars['String']>;
};

export type OrganizationInputInput = {
  name?: InputMaybe<Scalars['String']>;
};

/** Query root */
export type Query = {
  __typename?: 'Query';
  department?: Maybe<Department>;
  departments?: Maybe<Array<Maybe<Department>>>;
  employee?: Maybe<Employee>;
  employees?: Maybe<Array<Maybe<Employee>>>;
  employeesWithFilter?: Maybe<Array<Maybe<Employee>>>;
  student?: Maybe<Student>;
  students?: Maybe<Array<Maybe<Student>>>;
};


/** Query root */
export type QueryDepartmentArgs = {
  id?: InputMaybe<Scalars['BigInteger']>;
};


/** Query root */
export type QueryEmployeeArgs = {
  id?: InputMaybe<Scalars['BigInteger']>;
};


/** Query root */
export type QueryEmployeesWithFilterArgs = {
  filter?: InputMaybe<EmployeeFilterInput>;
};


/** Query root */
export type QueryStudentArgs = {
  id?: InputMaybe<Scalars['BigInteger']>;
};

export type Student = {
  __typename?: 'Student';
  id?: Maybe<Scalars['BigInteger']>;
  studentIdentifier?: Maybe<Scalars['String']>;
  studentJson?: Maybe<Scalars['String']>;
};

export type StudentInputInput = {
  id?: InputMaybe<Scalars['BigInteger']>;
  studentIdentifier?: InputMaybe<Scalars['String']>;
  studentJson?: InputMaybe<Scalars['String']>;
};

export type StudentsQueryVariables = Exact<{ [key: string]: never; }>;


export type StudentsQuery = { __typename?: 'Query', students?: Array<{ __typename?: 'Student', id?: any | null, studentIdentifier?: string | null, studentJson?: string | null } | null> | null };

export type NewOrganizationMutationVariables = Exact<{ [key: string]: never; }>;


export type NewOrganizationMutation = { __typename?: 'Mutation', newOrganization?: { __typename?: 'Organization', id?: any | null, name?: string | null } | null };

export type CreateNewStudentMutationVariables = Exact<{
  values: StudentInputInput;
}>;


export type CreateNewStudentMutation = { __typename?: 'Mutation', newStudent?: { __typename?: 'Student', id?: any | null, studentIdentifier?: string | null, studentJson?: string | null } | null };


export const StudentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"studentIdentifier"}},{"kind":"Field","name":{"kind":"Name","value":"studentJson"}}]}}]}}]} as unknown as DocumentNode<StudentsQuery, StudentsQueryVariables>;
export const NewOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"newOrganization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"Axacme","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<NewOrganizationMutation, NewOrganizationMutationVariables>;
export const CreateNewStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateNewStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"values"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StudentInputInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"values"},"value":{"kind":"Variable","name":{"kind":"Name","value":"values"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"studentIdentifier"}},{"kind":"Field","name":{"kind":"Name","value":"studentJson"}}]}}]}}]} as unknown as DocumentNode<CreateNewStudentMutation, CreateNewStudentMutationVariables>;