// UserItem.jsx
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { StyledCard, StyledButton, StyledCardContent, StyledCardMedia } from '../style/UserItemStyle';
import ModalEdit from './ModalEdit';

const UserItem = ({ user, users, updateUser }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedUserData, setEditedUserData] = useState({
        name: user.name,
        email: user.email,
        location: user.location,
    });

    const handleSave = (updatedData) => {
        console.log({ updatedData });
        // Find the index of the user in the array
        const userIndex = users.findIndex((u) => u.email === user.email);
        console.log(userIndex);
        if (userIndex !== -1) {
            // Update the user at the specific index
            const updatedUsers = [...users];
            updatedUsers[userIndex] = { ...user, ...updatedData };
            console.log(updatedUsers[userIndex]);

            // Update the entire array using the updateUser function
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
                </div>
            </StyledCardContent>

            <ModalEdit
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
                onCancel={handleCancel}
                editedUserData={editedUserData}
                setEditedUserData={setEditedUserData}
                users={users} // Pass the list of users for checking duplicates
            />
        </StyledCard>
    );
};

export default UserItem;
