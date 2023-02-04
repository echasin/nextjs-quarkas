import * as React from 'react';

import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Layout from 'components/layouts/layout'
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useMutation, useQuery, gql } from '@apollo/client'
import { StudentsDocument } from '@/gql/graphql'


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


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

//CONFIG DATA GRID
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
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
    }
];

export default function StudentListVersion2() {

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
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                </Box>

            </Container>
        </div>



    );
}