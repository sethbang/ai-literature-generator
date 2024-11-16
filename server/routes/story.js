// server/routes/story.js

const express = require('express');
const router = express.Router();
const openai = require('../services/veniceService');
const {
    generateOutlinePrompt,
    generateAuthorPrompt,
    generateEditorPrompt,
} = require('../utils/promptTemplates');
const Story = require('../models/Story');

router.post('/', async (req, res) => {
    const storyDetails = req.body;
    let generatedOutline = '';
    let generatedDraft = '';
    let editedDraft = '';

    try {
        // Outline Builder Agent
        const outlinePrompt = generateOutlinePrompt(storyDetails);
        console.log('Outline Prompt:', outlinePrompt); // Debugging
        const outlineResponse = await openai.createChatCompletion({
            model: 'llama-3.1-405b', // Use the appropriate model ID from Venice.ai
            messages: [
                { role: 'system', content: 'You are an assistant that helps build story outlines.' },
                { role: 'user', content: outlinePrompt },
            ],
            venice_parameters: {
                include_venice_system_prompt: false,
            },
        });
        generatedOutline = outlineResponse.data.choices[0].message.content;
        console.log('Generated Outline:', generatedOutline); // Debugging

        // Author Agent
        const authorPrompt = generateAuthorPrompt({ ...storyDetails, outline: generatedOutline });
        console.log('Author Prompt:', authorPrompt); // Debugging
        const authorResponse = await openai.createChatCompletion({
            model: 'llama-3.1-405b', // Use the appropriate model ID from Venice.ai
            messages: [
                { role: 'system', content: 'You are an assistant that writes stories.' },
                { role: 'user', content: authorPrompt },
            ],
            venice_parameters: {
                include_venice_system_prompt: false,
            },
        });
        generatedDraft = authorResponse.data.choices[0].message.content;
        console.log('Generated Draft:', generatedDraft); // Debugging

        // Editor Agent
        const editorPrompt = generateEditorPrompt(generatedDraft);
        console.log('Editor Prompt:', editorPrompt); // Debugging
        const editorResponse = await openai.createChatCompletion({
            model: 'llama-3.1-405b',
            messages: [
                { role: 'system', content: 'You are an assistant that edits stories.' },
                { role: 'user', content: editorPrompt },
            ],
            venice_parameters: {
                include_venice_system_prompt: false,
            },
        });
        editedDraft = editorResponse.data.choices[0].message.content;
        console.log('Edited Draft:', editedDraft); // Debugging

        // Save the story
        const story = await Story.create({
            ...storyDetails,
            outline: generatedOutline,
            generatedText: generatedDraft, // Save the original draft
            editedText: editedDraft,       // Save the edited draft separately
        });

        // Send both the original and edited drafts to the client
        res.json({
            generatedText: generatedDraft,
            editedText: editedDraft,
            storyId: story.id,
        });
    } catch (error) {
        console.error(
            'Error generating story:',
            error.response ? error.response.data : error.message
        );
        res.status(500).json({ error: 'Failed to generate story' });
    }
});

router.get('/:id', async (req, res) => {
    const storyId = req.params.id;

    try {
        const story = await Story.findByPk(storyId);

        if (!story) {
            return res.status(404).json({ error: 'Story not found' });
        }

        res.json({
            generatedText: story.generatedText,
            editedText: story.editedText,
        });
    } catch (error) {
        console.error('Error fetching story:', error);
        res.status(500).json({ error: 'Failed to fetch story' });
    }
});

module.exports = router;