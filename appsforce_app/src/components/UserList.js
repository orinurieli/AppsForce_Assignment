import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Typography, Paper } from '@mui/material';
import useFetchData from '../hooks/useFetchData';
import UserItem from './UserItem';
import axios from 'axios';


const url = 'https://randomuser.me/api/?results=10';

const UserList = () => {
    // const { data, loading, error } = useFetchData();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getData(url).then((res) => {
            setUsers(res)
        })
    }, []);

    // if (loading) {
    //     return (
    //         <Container>
    //             <CircularProgress />
    //         </Container>
    //     );
    // }

    // if (error) {
    //     return (
    //         <Container>
    //             <Typography variant="h6" color="error">
    //                 Error: {error.message}
    //             </Typography>
    //         </Container>
    //     );
    // }

    return (
        <Container>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h5" component="div" gutterBottom>
                    Users List
                </Typography>
                {users.map((user) => (
                    <UserItem key={user.login.uuid} user={user} />
                ))}
            </Paper>
        </Container>
    );
};

export default UserList;


async function getData(url) {

    return axios.get(url).then((response) => {
        return response.data.results
    }).catch((e) => {
        return e;
    })

}