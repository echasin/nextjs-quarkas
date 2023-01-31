import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useMutation, useQuery } from '@apollo/client'

import { CreateNewStudentDocument, NewOrganizationDocument, StudentInputInput, StudentsDocument, StudentsQuery, StudentsQueryVariables } from '@/gql/graphql'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { Box, Button, Divider, Input, Modal, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Field, FieldArray, Form, FormLoader, getFieldProps, Reset, ResponseMessage, Submit } from 'apollo-form'
import * as Yup from 'yup';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router'
import Layout from 'components/layouts/layout'
import StudentList from './studentsList'

export default function Home() {
    
  return (
      <Layout>
       <StudentList></StudentList>
      </Layout>
  )
}
