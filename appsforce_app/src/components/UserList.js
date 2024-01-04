// UserList.jsx
import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Typography, Paper, Button } from '@mui/material';
import UserItem from './UserItem';
import axios from 'axios';
import AddUserForm from './AddUserForm';

const url = 'https://randomuser.me/api/?results=10';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddUserDialogOpen, setAddUserDialogOpen] = useState(false);

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
    }

    const addUser = (newUser) => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
    };

    const deleteUser = (uuid) => {
        const updatedUsers = users.filter((user) => user.login.uuid !== uuid);
        setUsers(updatedUsers);
    };

    const handleAddUserClick = () => {
        setAddUserDialogOpen(true);
    };

    const handleAddUserDialogClose = () => {
        setAddUserDialogOpen(false);
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
            <Button variant="contained" color='secondary' onClick={handleAddUserClick}>
                Add User
            </Button>

            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h5" component="div" gutterBottom>
                    {`Top ${users.length} Users of all time:`}
                </Typography>

                {filterUserFields(users).map((filteredUser) => (
                    <UserItem
                        key={filteredUser.login.uuid}
                        user={filteredUser}
                        users={users}
                        updateUser={updateUser}
                        deleteUser={deleteUser} />
                ))}

                <AddUserForm
                    isOpen={isAddUserDialogOpen}
                    onClose={handleAddUserDialogClose}
                    addUser={addUser}
                />
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


function filterUserFields(users) {
    return users.map((user) => {
        const { login, name, email, location, picture } = user;
        return { login, name, email, location, picture };
    });
}