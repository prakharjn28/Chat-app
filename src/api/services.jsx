import api from './api';

export const fetchUsers = async () => {
    try {
        const response = await api('/api/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Error fetching users. Please try again.');
    }
};

export const updateUserNameApi = async (newName) => {
    try {
        const response = await api.put('/api/account/name', newName, {
            headers: {
                'Content-Type': 'text/plain',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user name:', error);
        throw new Error('Error updating user name. Please try again.');
    }
};
