import React, { useState } from 'react';
import { Modal, Typography } from '@mui/material';

import EditModal from './EditModal';
import {
    StyledCard,
    StyledCardMedia,
    StyledCardContent,
    StyledButton,
} from '../style/UserItemStyles';

const UserItem = ({ user, updateUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedUserData, setEditedUserData] = useState({
        name: user.name,
        email: user.email,
        location: user.location,
    });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        // Implement validation logic here before updating the user
        // ...

        updateUser(user.login.uuid, editedUserData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
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

                {isEditing ? (
                    <div>
                        {/* ... (existing edit logic) */}
                    </div>
                ) : (
                    <div>
                        <StyledButton variant="contained" onClick={handleEdit}>
                            Edit
                        </StyledButton>
                        <StyledButton variant="contained" onClick={handleOpenModal}>
                            Edit with Modal
                        </StyledButton>
                    </div>
                )}
            </StyledCardContent>

            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <EditModal user={user} updateUser={updateUser} onClose={handleCloseModal} />
            </Modal>
        </StyledCard>
    );
};

export default UserItem;
