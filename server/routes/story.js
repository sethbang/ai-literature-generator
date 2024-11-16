// server/routes/story.js

const express = require('express');
const router = express.Router();
const openai = require('../services/veniceService');
const { generateAuthorPrompt } = require('../utils/promptTemplates');

router.post('/', async (req, res) => {
    const storyDetails = req.body;
    const prompt = generateAuthorPrompt(storyDetails);

    try {
        const completion = await openai.createChatCompletion({
            model: 'default', // Use the appropriate model ID from Venice.ai
            messages: [
                { role: 'system', content: 'You are an assistant that helps write stories.' },
                { role: 'user', content: prompt },
            ],
            // Venice.ai specific parameters
            venice_parameters: {
                include_venice_system_prompt: false, // Set to true if you want to include Venice's default prompts
            },
        });

        const generatedText = completion.data.choices[0].message.content;
        // Optionally, save generatedText to your database here

        res.json({ generatedText });
    } catch (error) {
        console.error(
            'Error generating story:',
            error.response ? error.response.data : error.message
        );
        res.status(500).json({ error: 'Failed to generate story' });
    }
});

module.exports = router;