import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const generateShortUuid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

const AddUserForm = ({ isOpen, onClose, addUser }) => {
    const [newUser, setNewUser] = useState({
        login: {
            uuid: generateShortUuid(10),
        },
        name: { first: '', last: '' },
        email: '',
        location: { city: '', country: '' },
        picture: { medium: '' }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        console.log(name, value);
        if (name === "email") {
            setNewUser((prevUser) => ({
                ...prevUser,
                [name]: name === 'name' ? { ...prevUser.name, [e.target.id]: value } : value,
            }));
        }
        else { // Update the nested fields correctly
            setNewUser((prevUser) => ({
                ...prevUser,
                [name.includes('.') ? name.split('.')[0] : name]: {
                    ...prevUser[name.includes('.') ? name.split('.')[0] : name],
                    [name.includes('.') ? name.split('.')[1] : '']: value,
                },
            }));
        };
    };


    const handleSubmit = () => {
        // Todo: Add validation logic if needed
        // Todo: upload image logic?
        addUser(newUser);

        // Reset the form
        setNewUser({
            login: {
                uuid: generateShortUuid(10),
            },
            name: { first: '', last: '' },
            email: '',
            location: { city: '', country: '' },
            picture: { medium: '' }
        });

        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Add User</DialogTitle>
            <DialogContent>
                <TextField
                    label="First Name"
                    name="name.first"
                    value={newUser.name.first}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Last Name"
                    name="name.last"
                    value={newUser.name.last}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="City"
                    name="location.city"
                    value={newUser.location.city}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Country"
                    name="location.country"
                    value={newUser.location.country}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddUserForm;
