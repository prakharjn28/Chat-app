import React, { useState, useEffect } from 'react';
import '../styles/ChatMessages.css';
import { createMessage, getChatRooms, getCurrentRoom, getMessages } from '../store/actions.jsx';
import { useDispatch, useSelector } from 'react-redux';

const ChatMessages = ({ room }) => {
    const [newMessage, createNewMessage] = useState('');
    const [sendMessageError, setSendMessageError] = useState(null);
    const dispatch = useDispatch();
    const chatMessages = useSelector((state) => state.messages);
    const users = useSelector((state) => state.users);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if (room) {
                    await dispatch(getCurrentRoom(room.name));
                    await dispatch(getMessages(room.name));
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
                // Handle the error if needed
            }
        };

        // Initial fetch
        fetchMessages();

        // Set up a timer to fetch messages every 5 seconds
        const timerId = setInterval(fetchMessages, 5000);

        // Cleanup the timer on component unmount
        return () => clearInterval(timerId);
    }, [dispatch, room]);

    const findUserName = (posterId) => {
        const user = users.find((user) => user.publicUserId === posterId);
        return user ? user.name : 'Unknown User';
    };

    const handleSendMessage = async () => {
        try {
            if (newMessage.trim() === '') {
                setSendMessageError('Message cannot be empty.');
                return;
            }
            await dispatch(createMessage(room.name, newMessage));
            await dispatch(getMessages(room.name));
            createNewMessage('');
            setSendMessageError(null);
        } catch (error) {
            console.error('Error sending message:', error);
            // Handle the error if needed
        }
    };

    return (
        <div className="chatMessagesContainer">
            <h3 className="chatRoomHeader">Chat Room</h3>
            <h3 className="chatRoomHeader">
                Name: {room.name} Description: {room.description}
            </h3>
            <ul className="messageList">
                {chatMessages.map((message, index) => (
                    <li key={index} className="messageItem">
                        <span className="messageSender">{findUserName(message.posterId)}:</span>
                        <span className="messageContent">{message.messageText}</span>
                    </li>
                ))}
            </ul>
            <div className="messageInputContainer">
                <input
                    type="text"
                    className="messageInput"
                    placeholder="Type your message"
                    value={newMessage}
                    onChange={(e) => createNewMessage(e.target.value)}
                />
                <button className="sendMessageButton" onClick={handleSendMessage}>
                    Send Message
                </button>
                {sendMessageError && <p className="errorText">{sendMessageError}</p>}
            </div>
        </div>
    );
};

export default ChatMessages;
