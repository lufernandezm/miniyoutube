const request = require('supertest')
const app = require('../src/app')


test('Should post a new form', async () => {
    const response = await request(app).post('/videos').send({
        videoId: "6160ae1745c80a61b028876",
        action: "dislike",
        qty: 39
    }}).expect(200)