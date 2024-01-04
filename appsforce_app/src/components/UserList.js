import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Typography, Paper, Button, TextField } from '@mui/material';
import UserItem from './UserItem';
import axios from 'axios';
import AddUserForm from './AddUserForm';

const url = 'https://randomuser.me/api/?results=10';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

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

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const filteredUsers = users.filter((user) =>
        Object.values(user)
            .join(' ')
            .toLowerCase()
            .includes(searchText.toLowerCase())
    );

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
                Add User +
            </Button>

            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h5" component="div" gutterBottom>
                    {`Top ${users.length} Users of all time:`}
                </Typography>

                <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={searchText}
                    onChange={handleSearch}
                />

                {filteredUsers.map((user) => (
                    <UserItem
                        key={user.login.uuid}
                        user={user}
                        users={users}
                        updateUser={updateUser}
                        deleteUser={deleteUser}
                    />
                ))}

            </Paper>
            <AddUserForm
                isOpen={isAddUserDialogOpen}
                onClose={handleAddUserDialogClose}
                addUser={addUser}
            />
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


