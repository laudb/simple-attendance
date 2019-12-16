const request = require('supertest')
const mongoose = require('mongoose')
const app     = require('./index')
let   server

beforeAll(async (done) => {
    await mongoose.connect(process.env.TESTMONGOURL)
    server = app.listen(process.env.TESTPORT , () => {
        global.agent = request.agent(server)
        done();
    });
});

afterAll(async () => {
    await server.close();
    await mongoose.disconnect();
});


describe('Sample Test', () => {

    it('should test that true === true', () => {
        expect(true).toBe(true)
    })

})

describe('Endpoints', () => {

    it('should get the main url', async () => {
        const res = await request(app)
        .get('/v1/')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('response')
    })

    it('should get main url error', async (done) => {
        const res = await request(app)
        .get('/y1')
        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('response')
        expect(res.body.response).toEqual('Route Not Found.')
        done();
    })
})

