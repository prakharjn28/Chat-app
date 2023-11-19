import {
    fetchUsers,
    updateUserNameApi
} from '../api/services.jsx';
import {
    setUsers,
    setUser,
    getRooms,
    roomMessages,
    setCurrentRoom
} from './reducer.jsx';
import {
    addNewMessage,
    createChatRoom,
    fetchChatRooms,
    fetchMessages,
    fetchRoomDetails
} from "../api/chatRoomService.jsx";
import { parsedCookie } from "../globalFunctions.jsx";

export const getUsers = () => async (dispatch) => {
    try {
        const users = await fetchUsers();
        dispatch(setUsers(users));
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Error fetching users. Please try again.');
    }
};

export const setUserData = (user) => async (dispatch) => {
    try {
        dispatch(setUser(user));
    } catch (error) {
        console.error('Error setting user data:', error);
        throw new Error('Error setting user data. Please try again.');
    }
};

export const updateUserName = (newName) => async (dispatch) => {
    try {
        await updateUserNameApi(newName).then(() => {
            const { publicUserId } = parsedCookie;
            dispatch(getUsers()).then((users) => {
                if (users) {
                    const userData = users.find((user) => user.publicUserId === publicUserId);
                    dispatch(setUserData(userData));
                    return userData;
                }
            });
        });
    } catch (error) {
        console.error('Error updating user name:', error);
        throw new Error('Error updating user name. Please try again.');
    }
};

export const getChatRooms = () => async (dispatch) => {
    try {
        const rooms = await fetchChatRooms();
        dispatch(getRooms(rooms));
        return rooms;
    } catch (error) {
        console.error('Error fetching chat rooms:', error);
        throw new Error('Error fetching chat rooms. Please try again.');
    }
};

export const createNewRoom = (data) => async (dispatch) => {
    try {
        await createChatRoom(data);
    } catch (error) {
        console.error('Error creating a new room:', error);
        throw new Error('Error creating a new room. Please try again.');
    }
};

export const getCurrentRoom = (roomId) => async (dispatch) => {
    try {
        const room = await fetchRoomDetails(roomId);
        dispatch(setCurrentRoom(room));
        return room;
    } catch (error) {
        console.error('Error fetching room details:', error);
        throw new Error('Error fetching room details. Please try again.');
    }
};

export const getMessages = (roomId) => async (dispatch) => {
    try {
        const messages = await fetchMessages(roomId);
        dispatch(roomMessages(messages));
        return messages;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw new Error('Error fetching messages. Please try again.');
    }
};

export const createMessage = (roomId, message) => async (dispatch) => {
    try {
        await addNewMessage(roomId, message);
    } catch (error) {
        console.error('Error creating a new message:', error);
        throw new Error('Error creating a new message. Please try again.');
    }
};
