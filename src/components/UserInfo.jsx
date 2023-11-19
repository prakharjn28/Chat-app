import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserName } from '../store/actions.jsx';
import '../styles/UserInfo.css';

const UserInfo = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [newName, setNewName] = useState('');
    const [error, setError] = useState(null);

    const handleNameChange = async () => {
        try {
            const trimmedName = newName.trim();
            if (trimmedName !== '') {
                if (trimmedName === user.name) {
                    setError('New name must be different from the current name.');
                    return;
                }

                await dispatch(updateUserName(trimmedName));
                setNewName('');
                setError(null);
            } else {
                setError('Name cannot be empty');
            }
        } catch (error) {
            console.error('Error updating user name:', error);
            setError('Error updating user name. Please try again.');
        }
    };

    return (
        <div className="userInfoContainer">
            <h2 className="greeting">Hello, {user.name}!</h2>
            <input
                type="text"
                className="inputField"
                placeholder="Enter new name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
            />
            <button className="updateButton" onClick={handleNameChange}>
                Change Name
            </button>
            {error && <p className="errorText">{error}</p>}
        </div>
    );
};

export default UserInfo;
