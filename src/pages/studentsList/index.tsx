import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useMutation, useQuery } from '@apollo/client'

import { CreateNewStudentDocument, NewOrganizationDocument, StudentInputInput, StudentsDocument, StudentsQuery, StudentsQueryVariables } from '@/gql/graphql'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { Box, Button, Divider, Input, Modal, Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Field, FieldArray, Form, FormLoader, getFieldProps, Reset, ResponseMessage, Submit } from 'apollo-form'
import * as Yup from 'yup';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router'

const MyButton = styled(Button)({
  textTransform: 'none', 
});

export default function StudentList() {
    
  const router = useRouter()

  const { data, error, loading } = useQuery(StudentsDocument);

  if (error) {
    console.log('Error')
  }

  if (loading) {
    console.log('Loading')
  } 

  let rows = [];

  const newStudentPage =  () => {
    router.push('newStudent');
  };

  const editStudentPage =  (id: number) => {
    router.push({pathname: 'editStudent/[id]' , query: { id: id }});
  };


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography variant='h4'> 
        Students
      </Typography>   
      <Typography align='center'> 
        <MyButton 
            variant="contained"
            onClick={newStudentPage}>
              New Student
        </MyButton>
      </Typography>   

      <TableContainer component={Paper}>
       <Table sx={{ maxWidth: 850 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">student Identifier</TableCell>
            <TableCell align="right">User Name</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.students?.map((row) => (
            <TableRow
              key={row?.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell  align="right" component="th" scope="row">
                {row?.id}
              </TableCell>
              <TableCell align="right" component="th" scope="row">
                {row?.studentIdentifier}
              </TableCell>
              <TableCell align="right">{JSON.parse(row?.studentJson as string).studentName}
              </TableCell>
              <TableCell align="right">
                <MyButton 
                  variant="contained"
                  onClick={(e)=> editStudentPage(row?.id)}>
                    Edit
                </MyButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>   
    </>
  )
}