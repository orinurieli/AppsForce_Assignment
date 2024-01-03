import { useState } from 'react';

const useUserState = (initialState) => {
    const [users, setUsers] = useState(initialState);
    const updateUser = (users) => {
        // Implement logic to update a user in the users array
        // ...

        // setUsers([]);
    };

    return { users, updateUser, setUsers };
};

export default useUserState;
