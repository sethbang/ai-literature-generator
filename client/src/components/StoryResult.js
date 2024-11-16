// client/src/components/StoryResult.js

import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Typography, Container } from '@mui/material';
import axios from 'axios';

function StoryResult() {
    const location = useLocation();
    const { storyId } = useParams();
    const [generatedText, setGeneratedText] = useState(location.state?.generatedText || '');
    const [editedText, setEditedText] = useState(location.state?.editedText || '');

    useEffect(() => {
        if (!generatedText || !editedText) {
            // Fetch the story from the backend
            axios
                .get(`http://localhost:5001/api/stories/${storyId}`)
                .then((response) => {
                    setGeneratedText(response.data.generatedText);
                    setEditedText(response.data.editedText);
                })
                .catch((error) => console.error('Error fetching story:', error));
        }
    }, [generatedText, editedText, storyId]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Generated Story
            </Typography>
            <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                {generatedText}
            </Typography>
            <Typography variant="h5" gutterBottom style={{ marginTop: '2rem' }}>
                Editor's Review
            </Typography>
            <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                {editedText}
            </Typography>
        </Container>
    );
}

export default StoryResult;