const request = require('supertest');
const express = require('express');
const app = express();
const router = require('./../routes/login');

app.use(express.json());
app.use('/', router);

describe('POST /:userType', () => {
  test('should return 200 and a valid token when valid credentials are provided for Employer', async () => {
    const response = await request(app)
      .post('/Employer')
      .send({ username: 'validUsername', password: 'validPassword' });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body).toHaveProperty('token');
  });

  test('should return 200 and a valid token when valid credentials are provided for Employee', async () => {
    const response = await request(app)
      .post('/Employee')
      .send({ username: 'validUsername', password: 'validPassword' });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body).toHaveProperty('token');
  });

  test('should return 404 and an error message when invalid credentials are provided', async () => {
    const response = await request(app)
      .post('/Employer')
      .send({ username: 'invalidUsername', password: 'invalidPassword' });

    expect(response.status).toBe(404);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe('User not found');
  });

  test('should return 200 and an error message when missing parameters', async () => {
    const response = await request(app)
      .post('/Employer')
      .send({});

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe('Missing parameters');
  });

  test('should return 200 and an error message when username or password is too short', async () => {
    const response = await request(app)
      .post('/Employee')
      .send({ username: 'short', password: 'pass' });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe('Username and password must be at least 3 characters long');
  });
});
