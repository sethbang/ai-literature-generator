// client/src/components/StoryForm.js

import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StoryForm() {
    const [title, setTitle] = useState('');
    const [theme, setTheme] = useState('');
    const [genre, setGenre] = useState('');
    const [setting, setSetting] = useState('');
    const [pov, setPov] = useState('');
    const [tone, setTone] = useState('');
    const [audience, setAudience] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const storyData = {
            title,
            theme,
            genre,
            setting,
            pov,
            tone,
            audience,
        };

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5001/api/stories', storyData);
            const { generatedText, storyId } = response.data;
            // Navigate to the story result page
            navigate(`/story/${storyId}`, { state: { generatedText } });
        } catch (error) {
            console.error('Error submitting story:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h4" gutterBottom>
                Create a New Story
            </Typography>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Setting"
                value={setting}
                onChange={(e) => setSetting(e.target.value)}
                fullWidth
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="pov-label">Point of View</InputLabel>
                <Select
                    labelId="pov-label"
                    value={pov}
                    label="Point of View"
                    onChange={(e) => setPov(e.target.value)}
                >
                    <MenuItem value="First Person">First Person</MenuItem>
                    <MenuItem value="Second Person">Second Person</MenuItem>
                    <MenuItem value="Third Person">Third Person</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Target Audience"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? 'Generating...' : 'Generate Story'}
            </Button>
        </form>
    );
}

export default StoryForm;