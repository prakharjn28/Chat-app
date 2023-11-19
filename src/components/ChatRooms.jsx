// ChatRooms.jsx
import React, { useEffect, useState } from 'react';
import '../styles/ChatRooms.css';
import ChatMessages from './ChatMessages.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { createNewRoom, getChatRooms, getCurrentRoom, getMessages } from '../store/actions.jsx';

const ChatRooms = () => {
    const dispatch = useDispatch();
    const [selectedChat, setSelectedChat] = useState(null);
    const [newRoomName, setNewRoomName] = useState('');
    const [newRoomDescription, setNewRoomDescription] = useState('');
    const [createRoomError, setCreateRoomError] = useState(null);
    const chatRooms = useSelector((state) => state.rooms);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getChatRooms());
            } catch (error) {
                console.error('Error fetching chat rooms:', error);
                // Handle the error if needed
            }
        };

        // Initial fetch
        fetchData();
    }, [dispatch]);

    const handleChatClick = (chat) => {
        setSelectedChat(chat);
    };

    const handleCreateRoom = async () => {
        try {
            if (newRoomName.trim() === '') {
                setCreateRoomError('Room name cannot be empty.');
                return;
            }
            if (newRoomDescription.trim() === '') {
                setCreateRoomError('Room description cannot be empty.');
                return;
            }

            const newRoom = {
                name: newRoomName,
                description: newRoomDescription,
            };
            await dispatch(createNewRoom(newRoom));
            await dispatch(getChatRooms());
            setNewRoomName('');
            setNewRoomDescription('');
            setCreateRoomError(null);
            setSelectedChat(null);
        } catch (error) {
            console.error('Error creating new room:', error);
            // Handle the error if needed
        }
    };

    return (
        <div className="chatRoomsContainer">
            <div className="chatList">
                <div className="chatListTitle">Create a new Chat Room</div>
                <div className="createRoomForm">
                    <input
                        type="text"
                        placeholder="Room Name"
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                    />
                    <textarea
                        placeholder="Room Description"
                        value={newRoomDescription}
                        onChange={(e) => setNewRoomDescription(e.target.value)}
                    />
                    <button onClick={handleCreateRoom}>Create Room</button>
                    {createRoomError && <p className="errorText">{createRoomError}</p>}
                </div>
                <div className="chatListTitle">Chat Rooms</div>
                {chatRooms.map((chat, index) => (
                    <div
                        key={index}
                        className={`chatListItem ${selectedChat === chat ? 'selectedChat' : ''}`}
                        onClick={() => handleChatClick(chat)}
                    >
                        {chat.name}
                    </div>
                ))}
            </div>
            {selectedChat && (
                <div className="chatArea">
                    <ChatMessages room={selectedChat} />
                </div>
            )}
        </div>
    );
};

export default ChatRooms;
