import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useMutation, useQuery } from '@apollo/client'

import { CreateNewStudentDocument, NewOrganizationDocument, StudentsDocument, StudentsQuery, StudentsQueryVariables } from '@/gql/graphql'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { Box, Button, Divider, Input, Modal, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Field, FieldArray, Form, FormLoader, getFieldProps, Reset, ResponseMessage, Submit } from 'apollo-form'
import * as Yup from 'yup';

export default function Home() {


  const styled = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  const [open, setOpen] = useState(false);

  const { data, error, loading } = useQuery(StudentsDocument);


  if (error) {
    console.log('Error')
  }

  if (loading) {
    console.log('Loading')
  }


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  const rows = [
    { id: 1, lastNassme: 'Snow', firstNssasme: 'Jon' },
    { id: 2, lastNasme: 'Lannister', firsstsName: 'Cersei' },
 
  ];
  
  const handleOpen =  () => { 
     setOpen(true);
  };

  const handleClose =  () => { 
    setOpen(false);
 };

 const [addTodo] = useMutation(CreateNewStudentDocument);

 const createStudentMutation =  (data: any) => { 

  console.log(data.values);
   addTodo(data.values);  
   setOpen(false);
 };

 interface CreatePlanFormValues {
  studentName: string;
}

const validationSchema = Yup.object().shape({
  studentName: Yup.string().required()
});

const initialState = {
  studentName: ''
};


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
          { data?.students?.map(item=> { 
            return (
              <> 
                <Stack direction='row'>
                  <Typography> { item?.id} </Typography>
                  <Typography> { item?.studentJson} </Typography>
                  <Typography> { item?.studentIdentifier} </Typography>
                  <Button 
                    variant="contained"
                    onClick={handleOpen}>
                      New Student
                  </Button>  
                </Stack>  
               

              </>
            );
           })} 
          
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styled}>
              <Box>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Create new Student
                </Typography>
              </Box> 
              <Divider/>
                <Form<CreatePlanFormValues>
                  name='CreatePlanForm'
                  enableReinitialize
                  initialState={initialState}
                  validationSchema={validationSchema}
                  onSubmit={async ({ values }, form) => {
                      try {
                        await createStudentMutation({ values  });
                        form.reset();
                      } catch (e) {
                        console.log('error');
                      }
                  }}
                >
                  <Box sx={{ pt : 3}}>
                    <Field name='studentName'>{({ field }) => <Input {...getFieldProps(field)} placeholder='Student Name' />}</Field>
                    <ResponseMessage>{({ error }) => <span>{error}</span>}</ResponseMessage>
                  </Box>  
                  <FormLoader>
                      {({ loading }) => (
                        <span style={{ display: loading ? 'block' : 'none' }}>Loading...</span>
                      )}
                  </FormLoader>
                  <Box sx={{ pt : 3}}>
                    <Submit>
                        {({ disabled }) => (
                          <Button type='submit' disabled={disabled} >
                              Create Student
                          </Button>
                        )}
                    </Submit>
                    <Reset>
                        {({ disabled }) => (
                          <Button type='reset' disabled={disabled}  color="error" >
                              Reset
                          </Button>
                        )}
                    </Reset>
                  </Box>  
                </Form>             
              </Box>
          </Modal>
    </>
  )
}
