import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { Context, useMutation, useQuery } from '@apollo/client'
import { styled } from '@mui/material/styles';
import { CreateNewStudentDocument, DeleteStudentDocument, GetOneStudentDocument, NewOrganizationDocument, StudentInputInput, StudentsDocument, StudentsQuery, StudentsQueryVariables, UpdateStudentDocument } from '@/gql/graphql'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Input, Modal, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Field, FieldArray, Form, FormLoader, getFieldProps, Reset, ResponseMessage, Submit } from 'apollo-form'
import * as Yup from 'yup';
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next';

const MyButton = styled(Button)({
  textTransform: 'none', 
});

function EditStudent() {
    
  const router = useRouter()

  var id = router.query.id;
    
    const { data, error, loading } = useQuery(GetOneStudentDocument, {
      variables: { id:  Number(id) },
    });

    const [updateStudent] = useMutation(UpdateStudentDocument);
   
    const [deleteStudent] = useMutation(DeleteStudentDocument, {
      variables: { id:  Number(id) },
    });

    if (error) {
      console.log('Error')
    }
  
    if (loading) {
      console.log('Loading')
    }

    let rows: {course: string, score: number}[] = [];

    if (data) {
       rows =  JSON.parse(data?.student?.studentJson as string).testscores;
    }

    const studentPage =  () => {
     router.push('/');
    };

    const [openNewTest, setOpenNewTest] = useState(false);

    const [openEditTest, setOpenEditTest] = useState(false);

    const [openDeleteStudent, setOpenDeleteStudent] = useState(false);

    interface CreateFormValues {
      course: string;
      score: number | null;
    }
    
    const validationSchema = Yup.object().shape({
      course: Yup.string().required(),
      score: Yup.number().required()
    });
    
    const [course, setCourse] = useState('');
    const [score, setScore] = useState(null);

    const initialState = {
      course: course,
      score: score
    };

    const handleDeleteStudentOpen = () => {
      setOpenDeleteStudent(true);
    };

    const handleDeleteStudentClose= () => {
      setOpenDeleteStudent(false);
    };

    const handleNewOpen = () => {
      setCourse('')
      setScore(null)
      setOpenNewTest(true);
    };

    const handleEditOpen = (value: any) => {
      setCourse('')
      setScore(null)
      if (value != null) {
        console.log(value.row)
        setCourse(value.row.course)
        setScore(value.row.score)
      }
      setOpenEditTest(true);
    };

    const handleNewClose = () => {
      setOpenNewTest(false);
    };

    const handleEditClose = () => {
      setOpenEditTest(false);
    };

    const handleDeleteStudent = () => {
      deleteStudent();
      setOpenDeleteStudent(false);
      router.push('/');
    };


    const saveNewTest = (values: any) => {      
      rows=[...rows, values.values];

      let studentJson=JSON.parse(data?.student?.studentJson as string)
      studentJson.testscores=rows;

      const student: any={
        "data": {
          "id": data?.student?.id,
          "studentIdentifier": data?.student?.studentIdentifier,
          "studentJson": JSON.stringify(studentJson)
        }
      } 
      updateStudent({ variables: student })
      setOpenNewTest(false);
    };

    const editTest = (values: any) => {
      
      const filteredrows = rows.filter((item) => item.course !== course);

      console.log('1111111111111111111111111111111111111111110')
      console.log(filteredrows)
      console.log(values.values)

      rows=[...filteredrows, values.values];

      let studentJson=JSON.parse(data?.student?.studentJson as string)
      studentJson.testscores=rows;

      const student: any={
        "data": {
          "id": data?.student?.id,
          "studentIdentifier": data?.student?.studentIdentifier,
          "studentJson": JSON.stringify(studentJson)
        }
      } 
      updateStudent({ variables: student })
      setOpenEditTest(false);
    };

    const columns: GridColDef[] = [
      { field: 'course', headerName: 'course', width: 200 },
      { field: 'score', headerName: 'score', width: 150 },
      {
        field: 'Action',
        headerName: 'Action',
        width: 250,
        renderCell: (params: GridRenderCellParams<Date>) => (
          <Stack direction='row'>
            <MyButton
              variant="contained"
              size="small"
              style={{ marginLeft: 16 }}
              tabIndex={params.hasFocus ? 0 : -1}
              onClick={(e)=> handleEditOpen(params)}
            >
              Edit
            </MyButton>
            <MyButton
              variant="contained"
              size="small"
              style={{ marginLeft: 16 }}
              tabIndex={params.hasFocus ? 0 : -1}
            //  onClick={handleEditOpen}
              color="error"
            >
              Delete
            </MyButton>
          </Stack>
        ),
      }
    ];

  return (
    <>
      <Head>
        <title>Create New Student</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography align='center' sx={{ p:2 }} >    
      <MyButton 
          variant="contained"
          onClick={studentPage}
          >
             Student Page
      </MyButton>
      <MyButton 
                  variant="contained"
                  color='error'
                  onClick={handleDeleteStudentOpen} >
                    Delete Student
                </MyButton>
      </Typography>

      <Stack direction='row' spacing={5}>
        <Typography> Student Identifier:   </Typography>
        <Typography> { data?.student?.studentIdentifier} </Typography>
      </Stack>

      <Divider sx={{ p:2 }} />
    
      <Stack direction='row' spacing={50} sx={{ p:2 }} >
        <Typography> Test   </Typography>
        <MyButton 
          variant="contained"
          onClick={handleNewOpen}
          color="success">
             New Test 
        </MyButton>
      </Stack>

    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        getRowId={(row) => row.course}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>

    <Dialog open={openNewTest} onClose={handleNewClose}>
        <DialogTitle>New Test</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
            <Form<CreateFormValues>
                  name='CreatePlanForm'
                  enableReinitialize
                  initialState={initialState}
                  validationSchema={validationSchema}
                  onSubmit={async ({ values }, form) => {
                      try {
                        await saveNewTest({ values });
                        form.reset();
                      } catch (e) {
                        console.log(e);
                      }
                  }}
                >
                  <Box sx={{ pt : 3}}>
                    <Field name='course'>{({ field }) => <Input {...getFieldProps(field)} placeholder='Course Name' />}</Field>
                    <Field name='score'>{({ field }) => <Input {...getFieldProps(field)} placeholder='Score' />}</Field>
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
                          <MyButton type='submit' disabled={disabled} >
                              Add Test
                          </MyButton>
                        )}
                    </Submit>
                    <Reset>
                        {({ disabled }) => (
                          <MyButton type='reset' disabled={disabled}  color="error" >
                              Reset
                          </MyButton>
                        )}
                    </Reset>
                  </Box>  
                </Form>       
        </DialogContent>
      </Dialog>

      <Dialog open={openEditTest} onClose={handleEditClose}>
        <DialogTitle>Edit Test</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
            <Form<CreateFormValues>
                  name='CreatePlanForm'
                  enableReinitialize
                  initialState={initialState}
                  validationSchema={validationSchema}
                  onSubmit={async ({ values }, form) => {
                      try {
                        await editTest({ values });
                        form.reset();
                      } catch (e) {
                        console.log(e);
                      }
                  }}
                >
                  <Box sx={{ pt : 3}}>
                    <Field name='course'>{({ field }) => <Input {...getFieldProps(field)} placeholder='Course Name' />}</Field>
                    <Field name='score'>{({ field }) => <Input {...getFieldProps(field)} placeholder='Score' />}</Field>
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
                          <MyButton type='submit' disabled={disabled} >
                              Edit Test
                          </MyButton>
                        )}
                    </Submit>
                    <Reset>
                        {({ disabled }) => (
                          <MyButton type='reset' disabled={disabled}  color="error" >
                              Reset
                          </MyButton>
                        )}
                    </Reset>
                  </Box>  
                </Form>       
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDeleteStudent}
        onClose={handleDeleteStudentClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete Student!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this student?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MyButton onClick={handleDeleteStudent}>Delete Student</MyButton>
          <MyButton onClick={handleDeleteStudentClose} autoFocus>
            Cancel
          </MyButton>
        </DialogActions>
      </Dialog>


    </>
  )
}


export default EditStudent;
