// reducer.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    users: [],
    selectedRoom: { name: '', description: '' },
    rooms: [],
    messages: [],
};

const appSlice = createSlice({
    name: 'chat-app',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        getRooms: (state, action) => {
            state.rooms = action.payload;
        },
        setCurrentRoom: (state, action) => {
            state.selectedRoom = action.payload;
        },
        roomMessages: (state, action) => {
            state.messages = action.payload;
        },
        // Add more reducers as needed
    },
});

export default appSlice.reducer;
export const { setUser, setUsers, getRooms, roomMessages, setCurrentRoom } = appSlice.actions;
