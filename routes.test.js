const request  = require('supertest')
const mongoose = require('mongoose')
const http     = require('http')
const app      = require('./index')

let server =  http.createServer( app );

beforeAll(async (done) => {

    await mongoose.connect(process.env.MONGOURL, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true 
    });
    
    server.listen(process.env.TEST_PORT, () => {
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
    });

});

describe('Endpoints', () => {

    it('should get the api status response', async () => {
        const res = await request(server)
        .get('/v1/api-status')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('response')
    });

    it('should get main url error', async (done) => {
        const res = await request(server)
        .get('/y1')
        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('response')
        expect(res.body.response).toEqual('Route Not Found.')
        done();
    });
    
});

