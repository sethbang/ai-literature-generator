// server/tests/story.test.js

const request = require('supertest');
const app = require('../server');
const nock = require('nock');

describe('Story API', () => {
    beforeEach(() => {
        nock('https://api.venice.ai')
            .post('/api/v1/chat/completions')
            .reply(200, {
                choices: [
                    {
                        message: { content: 'Generated story content' },
                    },
                ],
            });
    });

    it('should create a new story', async () => {
        const response = await request(app)
            .post('/api/stories')
            .send({ title: 'Test Story' })
            .expect(200);
        expect(response.body).toHaveProperty('generatedText', 'Generated story content');
    });
});