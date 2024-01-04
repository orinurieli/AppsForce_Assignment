// UserItem.jsx
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { StyledCard, StyledButton, StyledCardContent, StyledCardMedia } from '../style/UserItemStyle';
import ModalEdit from './ModalEdit';

const UserItem = ({ user, users, updateUser, deleteUser }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedUserData, setEditedUserData] = useState({
        name: user.name,
        email: user.email,
        location: user.location,
    });

    const handleSave = (updatedData) => {
        const userIndex = users.findIndex((u) => u.login.uuid === user.login.uuid);
        if (userIndex !== -1) {
            const updatedUsers = [...users];
            updatedUsers[userIndex] = { ...user, ...updatedData };
            updateUser(updatedUsers);
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        // Show confirm dialog before deleting
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            // Call the function to delete the user
            deleteUser(user.login.uuid);
        }
    };

    return (
        <StyledCard>
            <StyledCardMedia
                component="img"
                alt={`${user.name.first} ${user.name.last}`}
                image={user.picture.medium}
            />
            <StyledCardContent>
                <Typography variant="h6" component="div">
                    Name: {user.name.first} {user.name.last}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Email: {user.email}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Location: {user.location.city}, {user.location.country}
                </Typography>
                <div>
                    <StyledButton variant="contained" onClick={handleOpenModal}>
                        Edit User
                    </StyledButton>
                    <StyledButton variant="contained" className="delete" onClick={handleDelete}>
                        Delete User
                    </StyledButton>

                </div>
            </StyledCardContent>

            <ModalEdit
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
                onCancel={handleCancel}
                editedUserData={editedUserData}
                setEditedUserData={setEditedUserData}
                users={users}
            />
        </StyledCard>
    );
};

export default UserItem;
