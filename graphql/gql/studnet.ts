import { gql } from '@apollo/client'

export const GetAllStudents = gql`
  query {
    students {
      id
      studentIdentifier
      studentJson
    }
  }`;

export const GetOneStudent = gql`
  query getOneStudent($id: BigInteger) {
    student(id: $id) {
      id
      studentIdentifier
      studentJson
    }
  }`;  

export const CreateNewStudent = gql`  
  mutation createNewStudent($values: StudentInputInput!) {
    newStudent(values: $values) {
      id
      studentIdentifier
      studentJson
    }
  }`
  
export const UpdateStudent = gql`  
  mutation updateStudent($data: StudentInputInput!) {
    updateStudent(data: $data) 
  }`  

export const DeleteStudent = gql`   
  mutation deleteStudent($id: BigInteger!) {
    deleteStudent(id: $id)  
  }`  
