import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, Alert, Box, Fade, IconButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import RefreshIcon from '@mui/icons-material/Refresh';

const Chat = ({expert}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        setErrorMessage('');
        if (newMessage.trim() !== '') {
            const question = {content: newMessage,role:"user"};
            const updatedMessages = [...messages, question];
            setMessages([...updatedMessages]);
            setLoading(true);
            sendMessageToAPI(updatedMessages, expert)
                .then((response) => {
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

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
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
                    <Fade in={!!errorMessage}>
                        <Grid item sx={{ width: '100%', mb: 2 }}>
                            <Alert 
                                severity="error" 
                                onClose={() => setErrorMessage('')}
                                sx={{ 
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 12px rgba(244, 67, 54, 0.2)'
                                }}
                            >
                                {errorMessage}
                            </Alert>
                        </Grid>
                    </Fade>
                )}
                <Grid item sx={{ mb: 2 }}>
                    <Button  
                        variant="outlined" 
                        startIcon={<RefreshIcon />}
                        onClick={() => setMessages([])}
                        sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 3,
                            py: 1,
                            borderWidth: 2,
                            borderColor: '#3b82f6',
                            color: '#3b82f6',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                borderWidth: 2,
                                borderColor: '#2563eb',
                                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                            },
                        }}
                    >
                        New Chat
                    </Button>
                </Grid>
                <Grid item className="chat-box" sx={{ width: '100%' }}>
                    {messages.length === 0 && !loading && (
                        <Box 
                            sx={{ 
                                textAlign: 'center', 
                                py: 8,
                                color: '#64748b',
                            }}
                        >
                            <Box sx={{ fontSize: '48px', mb: 2 }}>💬</Box>
                            <Box sx={{ fontSize: '24px', fontWeight: 600, mb: 1 }}>Start a conversation</Box>
                            <Box sx={{ fontSize: '16px' }}>Select an expert above and type your message below</Box>
                        </Box>
                    )}
                    {messages.map((message, index) => (
                        <Fade in={true} key={index} timeout={300}>
                            <div
                                className={message.role === 'user' ? 'message question' : 'message answer'}
                            >
                                <ReactMarkdown>{message.content}</ReactMarkdown>
                            </div>
                        </Fade>
                    ))}
                    {loading && (
                        <Fade in={loading}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
                                <CircularProgress size={24} sx={{ color: '#3b82f6' }} />
                                <Box sx={{ color: '#64748b' }}>Thinking...</Box>
                            </Box>
                        </Fade>
                    )}
                </Grid>
            </Grid>
            <Grid item className="input-box">
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
                    <TextField
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        multiline
                        maxRows={4}
                        fullWidth
                        disabled={loading}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '16px',
                                backgroundColor: 'white',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                                },
                                '&.Mui-focused': {
                                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                                },
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSendMessage}
                        disabled={loading || !newMessage.trim()}
                        endIcon={loading ? null : <SendIcon />}
                        sx={{
                            borderRadius: '16px',
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 4,
                            py: 1.5,
                            minWidth: '120px',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(59, 130, 246, 0.5)',
                            },
                            '&:disabled': {
                                background: 'linear-gradient(135deg, #cbd5e0 0%, #a0aec0 100%)',
                            },
                        }}
                    >
                        {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Send'}
                    </Button>
                </Box>
            </Grid>
        </div>
    );
}

export default Chat;