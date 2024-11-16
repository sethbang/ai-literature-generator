// client/src/components/StoryForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Typography,
    Container,
    Grid,
    CircularProgress,
} from '@mui/material';
import axios from 'axios';

function StoryForm() {
    const [storyDetails, setStoryDetails] = useState({
        title: '',
        theme: '',
        genre: '',
        setting: '',
        pov: '',
        tone: '',
        audience: '',
        characterProfiles: '',
        plotPoints: '',
        agentSettings: {
            iterations: 1,
        },
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setStoryDetails({
            ...storyDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleAgentSettingsChange = (e) => {
        setStoryDetails({
            ...storyDetails,
            agentSettings: {
                ...storyDetails.agentSettings,
                [e.target.name]: e.target.value,
            },
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5001/api/stories', storyDetails);
            const { generatedText, storyId } = response.data;

            navigate(`/story/${storyId}`, { state: { generatedText } });
        } catch (error) {
            console.error('Error generating story:', error);
            // Handle error (e.g., display a message to the user)
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Generate a Story
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* Story Details */}
                    <Grid item xs={12}>
                        <TextField
                            label="Title"
                            name="title"
                            value={storyDetails.title}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    {/* Add other story detail fields similar to the Title field */}
                    <Grid item xs={12}>
                        <TextField
                            label="Theme"
                            name="theme"
                            value={storyDetails.theme}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Genre"
                            name="genre"
                            value={storyDetails.genre}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Setting"
                            name="setting"
                            value={storyDetails.setting}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Point of View"
                            name="pov"
                            value={storyDetails.pov}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Tone"
                            name="tone"
                            value={storyDetails.tone}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Target Audience"
                            name="audience"
                            value={storyDetails.audience}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    {/* Character Profiles */}
                    <Grid item xs={12}>
                        <TextField
                            label="Character Profiles"
                            name="characterProfiles"
                            value={storyDetails.characterProfiles}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                        />
                    </Grid>
                    {/* Plot Points */}
                    <Grid item xs={12}>
                        <TextField
                            label="Plot Points"
                            name="plotPoints"
                            value={storyDetails.plotPoints}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                        />
                    </Grid>
                    {/* Agent Settings */}
                    <Grid item xs={12}>
                        <Typography variant="h6">Agent Settings</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Number of Iterations"
                            name="iterations"
                            type="number"
                            value={storyDetails.agentSettings.iterations}
                            onChange={handleAgentSettingsChange}
                            fullWidth
                        />
                    </Grid>
                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            fullWidth
                        >
                            {loading ? <CircularProgress size={24} /> : 'Generate Story'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default StoryForm;