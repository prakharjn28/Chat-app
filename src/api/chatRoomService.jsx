import api from './api';

export const fetchChatRooms = async () => {
    try {
        const response = await api('/api/rooms');
        return response.data;
    } catch (error) {
        console.error('Error fetching chat rooms:', error);
        throw new Error('Error fetching chat rooms. Please try again.');
    }
};

// Create a new room
export const createChatRoom = async (data) => {
    try {
        const response = await api.post('/api/rooms', data);
        return response.data;
    } catch (error) {
        console.error('Error creating chat room:', error);
        throw new Error('Error creating chat room. Please try again.');
    }
};

// Fetch room details
export const fetchRoomDetails = async (roomId) => {
    try {
        const response = await api(`/api/rooms/${roomId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching room details:', error);
        throw new Error('Error fetching room details. Please try again.');
    }
};

// Fetch messages for a room
export const fetchMessages = async (roomId) => {
    try {
        const response = await api(`/api/rooms/${roomId}/chats`);
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw new Error('Error fetching messages. Please try again.');
    }
};

// Create a new message
export const addNewMessage = async (roomId, message) => {
    try {
        const response = await api.post(`/api/rooms/${roomId}/chats`, message, {
            headers: {
                'Content-Type': 'text/plain',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding message:', error);
        throw new Error('Error adding message. Please try again.');
    }
};
