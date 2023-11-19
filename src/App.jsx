import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import UserInfo from './components/UserInfo.jsx';
import ChatRooms from './components/ChatRooms.jsx';
import { getUsers, setUserData, getChatRooms } from './store/actions.jsx';
import { parsedCookie } from "./globalFunctions.jsx";

const App = () => {
    const dispatch = useDispatch();
    const { publicUserId } = parsedCookie;

    useEffect(() => {

        // Fetch users
        if (publicUserId) {
            const fetchUsers = async () => {
                const users = await dispatch(getUsers());
                if (users) {
                    const userData = users.find((user) => user.publicUserId === publicUserId);
                    dispatch(setUserData(userData));
                }
            };

            // Fetch chat rooms
            const fetchChatRooms = async () => {
                await dispatch(getChatRooms());
            };

            // Initial fetch
            const fetchData = async () => {
                await fetchUsers();
                await fetchChatRooms();
            };

            // Set up a timer to fetch users and chat rooms every 10 seconds
            const timerId = setInterval(fetchData, 10000);

            // Initial fetch
            fetchData();

            // Cleanup the timer on component unmount
            return () => {
                clearInterval(timerId);
            };
        }
    }, [dispatch, publicUserId]);

    return (
        <div>
            <UserInfo />
            <ChatRooms />
        </div>
    );
};

export default App;
