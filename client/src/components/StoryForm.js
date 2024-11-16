// client/src/components/StoryForm.js

import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

function StoryForm() {
    const [title, setTitle] = useState('');
    const [theme, setTheme] = useState('');
    const [genre, setGenre] = useState('');
    const [setting, setSetting] = useState('');
    const [pov, setPOV] = useState('');
    const [tone, setTone] = useState('');
    const [audience, setAudience] = useState('');
    const [characterProfiles, setCharacterProfiles] = useState('');
    const [plotPoints, setPlotPoints] = useState('');
    const [generatedText, setGeneratedText] = useState('');
    const [loading, setLoading] = useState(false);

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
            characterProfiles,
            plotPoints,
        };

        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:5000/api/stories',
                storyData
            );
            setGeneratedText(response.data.generatedText);
        } catch (error) {
            console.error('Error submitting story:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Typography variant="h4">Create a New Story</Typography>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
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
                <TextField
                    label="Point of View"
                    value={pov}
                    onChange={(e) => setPOV(e.target.value)}
                    fullWidth
                    margin="normal"
                />
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
                <TextField
                    label="Character Profiles"
                    value={characterProfiles}
                    onChange={(e) => setCharacterProfiles(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                />
                <TextField
                    label="Plot Points"
                    value={plotPoints}
                    onChange={(e) => setPlotPoints(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                >
                    {loading ? 'Generating...' : 'Generate Story'}
                </Button>
            </form>

            {generatedText && (
                <div style={{ marginTop: '20px' }}>
                    <Typography variant="h5">Generated Story:</Typography>
                    <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                        {generatedText}
                    </Typography>
                </div>
            )}
        </div>
    );
}

export default StoryForm;