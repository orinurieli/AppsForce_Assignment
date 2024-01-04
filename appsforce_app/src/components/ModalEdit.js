import React, { useState } from 'react';
import { Modal, Typography, TextField } from '@mui/material';
import { StyledButton } from '../style/UserItemStyle';

const ModalEdit = ({ isOpen, onClose, onSave, editedUserData, setEditedUserData, users }) => {
    const [editedData, setEditedData] = useState({
        name: `${editedUserData.name.first} ${editedUserData.name.last}`,
        email: editedUserData.email,
        location: `${editedUserData.location.city} ${editedUserData.location.country}`,
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        location: '',
    });

    const validateForm = () => {
        const newErrors = {
            name: '',
            email: '',
            location: '',
        };

        if (!editedData.name || editedData.name.length < 3) {
            newErrors.name = 'Name should be at least 3 characters.';
        }

        if (!editedData.email || !isValidEmail(editedData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (!editedData.location) {
            newErrors.location = 'Location cannot be empty.';
        }

        setErrors(newErrors);

        // Check if there are no errors
        return Object.values(newErrors).every((error) => error === '');
    };

    const isValidEmail = (email) => {
        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSave = () => {
        if (validateForm()) {
            setEditedUserData((prevEditedUserData) => ({
                ...prevEditedUserData,
                name: {
                    first: editedData.name.split(' ')[0],
                    last: editedData.name.split(' ')[1],
                },
                location: {
                    city: editedData.location.split(' ')[0],
                    country: editedData.location.split(' ')[1],
                },
                email: editedData.email,
            }));

            onSave(editedUserData);
        }
    };


    const handleCancel = () => {
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
                <Typography variant="h6" gutterBottom>
                    Edit User
                </Typography>

                <TextField
                    label="Name"
                    value={editedData.name}
                    onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name}
                />

                <TextField
                    label="Email"
                    value={editedData.email}
                    onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email}
                />

                <TextField
                    label="Location"
                    value={editedData.location}
                    onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                    fullWidth
                    error={!!errors.location}
                    helperText={errors.location}
                />

                <StyledButton variant="contained" onClick={handleSave}>
                    Save
                </StyledButton>
                <StyledButton variant="contained" onClick={handleCancel}>
                    Cancel
                </StyledButton>
            </div>
        </Modal>
    );
};

export default ModalEdit;
