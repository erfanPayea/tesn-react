// ChatComponent.js

import React, {useEffect, useState} from 'react';
import './Messages.css';
import useLocalStorageState from "../UseLocalStorageState";
import {useNavigate} from "react-router-dom"; // Import the CSS file

const ChatComponent = (props) => {
    const navigate = useNavigate();
    // const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [chatMessages, setChatMessages] = useLocalStorageState("chatMessages", [{}]);
    const userData = localStorage.getItem('userData');
    const userId = userData ? JSON.parse(userData).id : null;
    const getData = async () => {
        // Perform login logic here with username and password
        // For example, you can send an API request or handle authentication logic
        try {
            // Send the POST request to the server
            const response = await fetch('http://127.0.0.1:8000/chat/' + props.chatId + '/message', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token'),
                }
            });

            const result = await response.json();
            if (response.ok) {
                setChatMessages(result);
            } else {
                alert(result['message']);
            }

            // alert("Success!")
        } catch (error) {
            // Handle any error that occurred during the request
            // console.error('Error:', error);
            alert("during updating chat some problems happened");
        }
    };

    const sendMessage = async () => {
        const data = {
            content: newMessage
        };
        // Perform login logic here with username and password
        // For example, you can send an API request or handle authentication logic
        try {
            // Send the POST request to the server
            const response = await fetch('http://127.0.0.1:8000/chat/' + props.chatId + '/message', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token'),
                }
            });

            const result = await response.json();
            if (response.ok) {
                setNewMessage('');
                // console.log(localStorage.getItem('userData').username);
                // setChatMessages(result);
            } else {
                alert(result['message']);
            }

            // alert("Success!")
        } catch (error) {
            // Handle any error that occurred during the request
            // console.error('Error:', error);
            alert("sending message was unsuccessful");
        }
    };

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
        sendMessage();

        setChatMessages([...chatMessages, {content: newMessage, sender: {id: userId}}]);

    };

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            alert("please login first");
            navigate("../");
            return;
        }
        if (props.chatId > 0)
            getData();
    }, [props.chatId]);

    return (
        <div className="container">
            <div className="chat-box">{chatMessages.length > 0 &&
                chatMessages.map((message, index) => (
                    <div key={index} className="message-container">
                        {/* todo: set avatar with contact.avatarPath */}
                        <p className={`message ${message.sender && message.sender.id === userId ? 'user-message' : ''}`}>
                            <strong>{message.sender && (message.sender.id === userId ? '' : message.sender.username)}
                            </strong> {message.content}
                        </p>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="message-input"
                />
                <button onClick={handleSendMessage} className="send-button">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatComponent;
