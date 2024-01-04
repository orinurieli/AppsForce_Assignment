import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Typography, Paper } from '@mui/material';
import UserItem from './UserItem';
import axios from 'axios';

const url = 'https://randomuser.me/api/?results=10';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getData(url)
            .then((res) => {
                setUsers(res);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const updateUser = (updatedUsers) => {
        console.log('updating users!');
        setUsers(updatedUsers);
    };

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography variant="h6" color="error">
                    Error: {error.message}
                </Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h5" component="div" gutterBottom>
                    Top 10 Users of all time:
                </Typography>
                {users.map((user) => (
                    <UserItem key={user.login.uuid} user={user} users={users} updateUser={updateUser} />
                ))}
            </Paper>
        </Container>
    );
};

export default UserList;

async function getData(url) {
    return axios
        .get(url)
        .then((response) => {
            return response.data.results;
        })
        .catch((e) => {
            throw new Error(e.message);
        });
}
