import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const ExpertSelector = ({onSelection}) => {
    const [selectedExpert, setSelectedExpert] = useState('');

    const handleChange = (event) => {
        const expert = event.target.value;
        setSelectedExpert(expert);
        console.log(expert);
        onSelection(expert);
    };

    return (
        <FormControl fullWidth style={{ marginTop: '20px' }}>
            <InputLabel id="expert-selector-label">Select Expert</InputLabel>
            <Select
                labelId="expert-selector-label"
                id="expert-selector"
                value={selectedExpert}
                onChange={handleChange}
            >
                <MenuItem value="GrammarExpert">Grammar Expert</MenuItem>
                <MenuItem value="SoftwareExpert">Software Expert</MenuItem>
                <MenuItem value="BusinessCommunicationsExpert">Business Communications Expert</MenuItem>
            </Select>
        </FormControl>
    );
};
export default ExpertSelector;