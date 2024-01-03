import React, { useState } from 'react';

const EditModal = ({ isOpen, onClose, user, updateUser }) => {
    const [editedUserData, setEditedUserData] = useState({
        name: user.name,
        email: user.email,
        location: user.location,
    });

    const handleSave = () => {
        // Implement validation logic here before updating the user
        // ...

        updateUser(user.login.uuid, editedUserData);
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className={`modal ${isOpen ? 'show' : 'hide'}`}>
            <div className="modal-content">
                <h2>Edit User</h2>
                <label>
                    Name:
                    <input
                        type="text"
                        value={editedUserData.name}
                        onChange={(e) => setEditedUserData({ ...editedUserData, name: e.target.value })}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={editedUserData.email}
                        onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })}
                    />
                </label>
                {/* Add editable location fields here */}
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default EditModal;
