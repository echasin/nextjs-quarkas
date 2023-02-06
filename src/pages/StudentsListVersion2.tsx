import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { DataGrid, GridColDef, GridEventListener,GridFooter,GridRenderCellParams,useGridApiContext, useGridApiEventHandler} from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Layout from 'components/layouts/layout'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useMutation, useQuery, gql } from '@apollo/client'
import { StudentsDocument } from '@/gql/graphql'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Stack } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const MyButton = styled(Button)({
  textTransform: 'none', 
});

//RETREIVE DATA USING GRAPHQL DEFINED QUERY
const QUERY_GETSTUDENTS = gql`
 query students {
     students {
       id
       studentIdentifier
       studentJson
     }
   }
`;

//FUNCTIONAL COMPONENT FOR DATAGRID FOOTER
// const Footer is required by Data Grid
const Footer = () => {

    const [message, setMessage] = React.useState('');
    const apiRef = useGridApiContext();
  
    const handleRowClick: GridEventListener<'rowClick'> = (params) => {
      setMessage(`Student "${params.row.id}" clicked`);
    };
  
    useGridApiEventHandler(apiRef, 'rowClick', handleRowClick);
  
    return (
      <React.Fragment>
        <GridFooter />
        {message && <Alert severity="info">{message}</Alert>}
      </React.Fragment>
    );
  };

export default function StudentListVersion2() {

  const router = useRouter(); //ALI  DECLARATION SHOULD BE INSIDE FUNCTION SCOPE 

  const editStudentPage =  (id: any) => {
    console.log (id) 
    router.push({pathname: 'editStudent/[id]' , query: { id: id }});
  };

    //RETREIVE DATA USING GRAPHQL FROM GENERATED CODE
    // const { data, error, loading } = useQuery(StudentsDocument);

    //RETREIVE DATA USING GRAPHQL DEFINED QUERY
    const { data, error, loading } = useQuery(QUERY_GETSTUDENTS);
    console.log("data:", data);

    //MESSAGE FOR QUERY LOADING
    if (loading) {
        return <h2>Loading...</h2>;
    }

    //ERROR HANDLING
    if (error) {
        console.error("ERROR QUERY_GETSTUDENTS", error);
        return <h2>ERROR...</h2>;
    }

    //SET student DATA OBJECT
    const students = data.students;
    console.log("students:", students);

    //CONFIG DATA GRID
const columns: GridColDef[] = [
  { 
      field: 'id',
      headerName: 'ID', 
      width: 90,
      renderCell: (params) => ( //ALI
          <Link href={`/editStudent/${params.value}`}>{params.value}</Link>
        ) 
  },
  {
      field: 'studentIdentifier',
      headerName: 'Student Identifier',
      width: 150,
      editable: true,
  },
  {
      field: 'studentJson',
      headerName: 'Student JSON',
      width:  750,
      editable: true,
  },
  {
    field: 'Action',  //ALI
    headerName: 'Action',
    width: 250,
    renderCell: (params: GridRenderCellParams<Date>) => (
      <Stack direction='row'>
        <MyButton
          variant="contained"
          size="small"
          style={{ marginLeft: 16 }}
          tabIndex={params.hasFocus ? 0 : -1}
          onClick={(e: any)=> editStudentPage(params.id)}
        >
          Edit
        </MyButton>
      </Stack>
    ),
  }
];

    return (
        <div className='main-content'>
            <Container>
                Hello World
                {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} /> */}
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={students}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        onCellDoubleClick={(params, event) => { ///ALI REMOVE CELL CLICK ACTION
                           console.log('DOUBLE CLICK')
                          }}           
                        experimentalFeatures={{ newEditingApi: true }}
                        components={{Footer}}
                    />
                </Box>

            </Container>
        </div>



    );
}