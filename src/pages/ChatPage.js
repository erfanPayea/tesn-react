import React, {useEffect, useState} from 'react';
import './ChatPage.css';
import {useNavigate} from "react-router-dom"; // Import CSS for styling

const ChatPage = () => {
    const navigate = useNavigate();
    // const [error, setError] = useState('');
    const [data, setData] = useState([{}])
    const getData = async () => {
        // Perform login logic here with username and password
        // For example, you can send an API request or handle authentication logic
        try {
            // Send the POST request to the server
            const response = await fetch('http://127.0.0.1:8000/chat/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token'),
                }
            });

            const result = await response.json();
            if(response.ok) {
                console.log(result);
                setData(result);
            }
            else {
                alert(result['message']);
                navigate("../");
            }

            // alert("Success!")
        } catch (error) {
            // Handle any error that occurred during the request
            // console.error('Error:', error);
            alert("some problems happen");
        }
    };

    useEffect(() => {
        if(localStorage.getItem('token') == null) {
            alert("please login first");
            navigate("../");
            return;
        }
        getData();
    }, []);


    // Sample data for chat messages
    // const chatMessages = [
    //     { id: 1, text: 'Hey, how are you?' },
    //     { id: 2, text: 'I\'m good, thanks! How about you?' },
    //     // Add more messages as needed
    // ];

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Chat</h2>
            </div>
            <div className="chat-messages">
                {/* Display chat messages */}
                {data.map(chat => (
                    <div key={chat.id} className="message">
                        {chat.cantact && (
                            <div>
                                <p>{chat.cantact.id}</p>
                                <p>{chat.cantact.username}</p>
                                {/* Include other properties of nested_field as needed */}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {/* Additional components for sending messages, etc. */}
        </div>
    );
};

export default ChatPage;
