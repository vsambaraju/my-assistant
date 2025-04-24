import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';


const Chat = ({role}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');


    const handleInputChange = (event) => {
        setNewMessage(event.target.value);
    }

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            // Add the message to the chat
            const question = "Question: "+newMessage;
            setMessages([...messages, question]);
            console.log(messages);
            // Make the API call
            console.log("role: "+role)
            sendMessageToAPI(newMessage,role)
                .then((response) => {
                    // Clear the input field
                    const responseMessage = response.response.response +" "+response.response.explanation;
                    setMessages([...messages, question, responseMessage]);
                    setNewMessage('');
                })
                .catch(error => {
                    console.error('Error sending message:', error);
                    setMessages([...messages, question, error.message]);
                });
        }
    };

    const sendMessageToAPI = (message,role) => {
        return fetch('https://1g1gmm4wd0.execute-api.us-east-1.amazonaws.com/dev/users/assistant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, role }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to send message');
            }
            return response.json();
        })
        .catch(error => {
            throw new Error(error);         
        });
    };

    return (
        <div className='chat-container'>
            <Grid container direction="column" alignItems="center" className='chat-content'>
                <Grid item className="chat-box">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={index % 2 === 0 ? 'message question' : 'message answer'}
                        >
                            <ReactMarkdown>{message}</ReactMarkdown>
                        </div>
                    ))}
                </Grid>
            </Grid>
                <Grid item className="input-box">
                    <TextField
                        type="text"
                        value={newMessage}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <br />
                    <Button
                        style={{ marginTop: '10px' }}
                        variant="contained"
                        color="primary"
                        onClick={handleSendMessage}
                    >
                        Send
                    </Button>
                </Grid>
        </div>
    );
}

export default Chat;