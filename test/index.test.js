const request = require('supertest');
const express = require('express');

const app = express();
app.get('/', (_, res) => res.send('Hello World from GCP!'));

describe('GET /', () => {
  it('should return Hello World', async () => {
    const res = await request(app).get('/');
    res.should.have.status(200);
    res.text.should.equal('Hello World from GCP!');
  });
});