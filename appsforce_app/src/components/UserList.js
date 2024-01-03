import React, { useEffect } from 'react';
import { CircularProgress, Container, Typography, Paper } from '@mui/material';
import useFetchData from '../hooks/useFetchData';
import useUserState from '../hooks/useUserState';
import UserItem from './UserItem';


const UserList = () => {
    const { data, loading, error } = useFetchData();
    const { users, updateUser, setUsers } = useUserState(data);

    useEffect(() => {
        if (data) setUsers(data)
    }, [data])

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
                    User List
                </Typography>
                {users.map((user) => (
                    <UserItem key={user.login.uuid} user={user} updateUser={updateUser} />
                ))}
            </Paper>
        </Container>
    );
};

export default UserList;
