// server/services/veniceService.js

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.VENICE_API_KEY,
    basePath: 'https://api.venice.ai/api/v1', // Venice.ai base URL
});

const openai = new OpenAIApi(configuration);

module.exports = openai;