// server/routes/story.js

const express = require('express');
const router = express.Router();
const { generateText } = require('../services/ollamaService');
const { generateAuthorPrompt } = require('../utils/promptTemplates');
const Story = require('../models/Story');

// Create a new story
router.post('/', async (req, res) => {
    const storyDetails = req.body;
    const prompt = generateAuthorPrompt(storyDetails);

    try {
        const generatedText = await generateText(prompt);

        // Save story to database
        const newStory = await Story.create({
            title: storyDetails.title,
            theme: storyDetails.theme,
            genre: storyDetails.genre,
            setting: storyDetails.setting,
            pov: storyDetails.pov,
            tone: storyDetails.tone,
            audience: storyDetails.audience,
            content: generatedText,
            // userId: storyDetails.userId, // Uncomment if using authentication
        });

        res.json({ generatedText, storyId: newStory.id });
    } catch (error) {
        console.error('Error generating story:', error);
        res.status(500).json({ error: 'Failed to generate story' });
    }
});

// Get all stories
router.get('/', async (req, res) => {
    try {
        const stories = await Story.findAll();
        res.json(stories);
    } catch (error) {
        console.error('Error fetching stories:', error);
        res.status(500).json({ error: 'Failed to fetch stories' });
    }
});

// Get a single story by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const story = await Story.findByPk(id);
        if (story) {
            res.json(story);
        } else {
            res.status(404).json({ error: 'Story not found' });
        }
    } catch (error) {
        console.error('Error fetching story:', error);
        res.status(500).json({ error: 'Failed to fetch story' });
    }
});

module.exports = router;