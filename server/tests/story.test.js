// server/tests/story.test.js

const request = require('supertest');
const app = require('../server');

describe('Story API', () => {
    it('should create a new story', async () => {
        const response = await request(app)
            .post('/api/stories')
            .send({ title: 'Test Story' })
            .expect(200);

        expect(response.body).toHaveProperty('generatedText');
    });
});