import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Chat = ({expert}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        setErrorMessage(''); // Clear any previous error message
        if (newMessage.trim() !== '') {
            const question = {content: newMessage,role:"user"};
            const updatedMessages = [...messages, question];
            setMessages([...updatedMessages]);
            setLoading(true);
            sendMessageToAPI(updatedMessages, expert)
                .then((response) => {
                    //const responseMessage = response.response.response + " " + response.response.explanation;
                    setMessages([...response.messages]);
                    setNewMessage('');
                })
                .catch(error => {
                    console.error('Error sending message:', error);
                    setErrorMessage(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const sendMessageToAPI = (messages,expert) => {
        return fetch('https://1g1gmm4wd0.execute-api.us-east-1.amazonaws.com/dev/users/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages, expert }),
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
            <Grid container direction="column" alignItems="center" sx={{justifyContent: "flex-start",alignItems: "flex-start",}} className='chat-content'>
                {errorMessage && (
                    <Grid item>
                        <Alert severity="error" onClose={() => setErrorMessage('')}>{errorMessage}</Alert>
                    </Grid>
                )}
                <Grid item >
                    <Button  style={{ margin: '10px' }} variant="outlined" onClick={() => setMessages([])}>New Chat</Button>
                </Grid>
                {/* <Grid item className="chat-header">
                    {expert && <h2>Chat with {expert}</h2>  } 
                    <p>Ask your questions and get instant answers!</p>
                </Grid> */}
                <Grid item className="chat-box">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={message.role === 'user' ? 'message question' : 'message answer'}
                        >
                            <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                    ))}
                </Grid>
            </Grid>
            <Grid item className="input-box">
                    <>
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
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Send'}
                        </Button>
                    </>
            </Grid>
        </div>
    );
}

export default Chat;