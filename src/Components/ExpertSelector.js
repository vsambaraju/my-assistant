import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';

const ExpertSelector = ({onSelection}) => {
    const [selectedExpert, setSelectedExpert] = useState('');

    const handleChange = (event) => {
        const expert = event.target.value;
        setSelectedExpert(expert);
        onSelection(expert);
    };

    return (
        <Box sx={{ mb: 2 }}>
            <FormControl 
                fullWidth 
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        },
                        '&.Mui-focused': {
                            boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        fontWeight: 500,
                    },
                }}
            >
                <InputLabel id="expert-selector-label">Select Expert</InputLabel>
                <Select
                    labelId="expert-selector-label"
                    id="expert-selector"
                    value={selectedExpert}
                    onChange={handleChange}
                    label="Select Expert"
                >
                    <MenuItem value="GrammarExpert">📝 Grammar Expert</MenuItem>
                    <MenuItem value="SoftwareExpert">💻 Software Expert</MenuItem>
                    <MenuItem value="BusinessCommunicationsExpert">💼 Business Communications Expert</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};
export default ExpertSelector;