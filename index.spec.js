const request = require('supertest');
const server = require('./server')
const db = require('./data/dbConfig.js')

afterEach(async () => {
    await db('games').truncate();
});

describe('index.js', ()=>{
    describe('post games', ()=>{
        it('should return status code 201', async()=>{
            const result = await request(server).post('/api/games')
            .send({title: 'csgo', genre: 'first person shooter', releaseYear: 2010})
            expect(result.status).toBe(201);
        })
        it ('should return status code 422 with missing element', async () => {
            const result = await request (server)
            .post ('/api/games')
            .send ({title: 'csgo',});
            expect (result.status).toBe (422);
        });
        it('should return something', async()=>{
            const result = await request(server).post('/api/games')
            .send({ title: 'fortnite', genre: 'third person battle royale', releaseYear: 2017 })
            expect(result.body).toBeTruthy()
        })

    })
    describe('get games',()=>{
        it('should return an array',async ()=>{
            const result = await request(server).get ('/api/games');
            expect (Array.isArray(result.body)).toBeTruthy()
        })
        it('should return status code 200', async()=>{
            const result = await request(server).get('/api/games');
            expect(result.status).toBe(200)
        })
        it('should get data',async()=>{
            const postResult = await request(server).post('/api/games')
            .send({ title: 'fortnite', genre: 'third person battle royale', releaseYear: 2017 })
            const result = await request(server).get('/api/games')
            const expected = [{ id: 1, title: 'fortnite', genre: 'third person battle royale', releaseYear: 2017 }]
            expect(result.body).toEqual(expected)
        })
    })
})