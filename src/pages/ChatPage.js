import React from 'react';
import './ChatPage.css'; // Import CSS for styling

const ChatPage = () => {
    // Sample data for chat messages
    const chatMessages = [
        { id: 1, text: 'Hey, how are you?' },
        { id: 2, text: 'I\'m good, thanks! How about you?' },
        // Add more messages as needed
    ];

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Chat</h2>
            </div>
            <div className="chat-messages">
                {/* Display chat messages */}
                {chatMessages.map(message => (
                    <div key={message.id} className="message">
                        {message.text}
                    </div>
                ))}
            </div>
            {/* Additional components for sending messages, etc. */}
        </div>
    );
};

export default ChatPage;
