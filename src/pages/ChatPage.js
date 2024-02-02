import React, {useEffect, useState} from 'react';
import './ChatPage.css';
import {json, Link, useNavigate} from "react-router-dom";
import useLocalStorageState from "../components/UseLocalStorageState";
import Messages from "../components/Chat/Messages"; // Import CSS for styling

const ChatPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useLocalStorageState("userChats", [{}]);
    const [chatId, setChatID] = useLocalStorageState("id", 0);
    const [newUserId, setNewUserId] = useState(0);


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
                setData(result);
            }
            else {
                alert(result['message']);
                navigate("../");
            }
        } catch (error) {
            alert("some problems happen");
        }
    };

    const newChat = async () => {
        // Perform login logic here with username and password
        // For example, you can send an API request or handle authentication logic
        const data = {
            'userId' : newUserId
        }
        try {
            // Send the POST request to the server
            const response = await fetch('http://127.0.0.1:8000/chat/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token'),
                }
            });

            const result = await response.json();
            if(response.ok) {
                setData([...data, result.data])
            }
            else {
                alert(result['message']);
            }
        } catch (error) {
            alert("some problems happen");
        }
    };

    const handelId =(id) =>{
        if(id > 0)
            setChatID(id);
    }

    useEffect(() => {
        if(localStorage.getItem('token') == null) {
            alert("please login first");
            navigate("../");
            return;
        }
        getData( );
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
                <div className="chat-names">
                {data.map(chat => (
                    <>
                        {chat.cantact && (
                            <div key={chat.id} onClick={() => handelId(chat.id)} className="name">
                                <p>{chat.cantact.username}</p>
                                {/* Include other properties of nested_field as needed */}
                            </div>
                        )}
                    </>
                ))}
                    <div className="new-chat">
                        <input type="input" value={newUserId} placeholder="user id to start chat" required={true}
                               onChange={event => setNewUserId(event.target.value)}
                        />
                        <button className="new-chat-button" onClick={newChat}>
                            <span role="img">+</span>
                        </button>
                    </div>
                </div>
                <Messages chatId={chatId}/>

            </div>
            {/* Additional components for sending messages, etc. */}
        </div>
    );
};

export default ChatPage;
