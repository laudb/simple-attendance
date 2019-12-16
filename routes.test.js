const request = require('supertest')
const app     = require('./index')

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

    it('should get main url error', async () => {
        const res = await request(app)
        .get('/y1/')
        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('Route Not Found.')
    })
})

