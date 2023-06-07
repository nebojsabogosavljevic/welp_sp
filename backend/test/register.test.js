const request = require('supertest');
const express = require('express');
const app = express();
const router = require('./../routes/employee');

app.use(express.json());
app.use('/', router);

describe('POST /employee', () => {
  test('should return 200 and create a new employee user when all required parameters are provided', async () => {
    const response = await request(app)
      .post('/employee')
      .send({
        name: 'John',
        surname: 'Doe',
        username: 'johndoe',
        password: 'password',
        email: 'johndoe@example.com',
        phone: '123456789',
        city: 'New York',
        country: 'USA',
        address: '123 Street',
        idCardNumber: 'ABC123',
        citizenship: 'USA',
        languages: ['English']
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });

  test('should return 404 and an error message when missing parameters', async () => {
    const response = await request(app)
      .post('/employee')
      .send({});

    expect(response.status).toBe(404);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe('Missing parameters');
  });

  test('should return 404 and an error message when username or password is too short', async () => {
    const response = await request(app)
      .post('/employee')
      .send({
        name: 'John',
        surname: 'Doe',
        username: 'short',
        password: 'pass',
        email: 'johndoe@example.com',
        phone: '123456789',
        city: 'New York',
        country: 'USA',
        address: '123 Street',
        idCardNumber: 'ABC123',
        citizenship: 'USA',
        languages: ['English']
      });

    expect(response.status).toBe(404);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe('Username and password must be at least 3 characters long');
  });

  test('should return 404 and an error message when a user with the same username already exists', async () => {
    const response = await request(app)
      .post('/employee')
      .send({
        name: 'John',
        surname: 'Doe',
        username: 'johndoe',
        password: 'password',
        email: 'johndoe@example.com',
        phone: '123456789',
        city: 'New York',
        country: 'USA',
        address: '123 Street',
        idCardNumber: 'ABC123',
        citizenship: 'USA',
        languages: ['English']
      });

    expect(response.status).toBe(404);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe('User with this username already exists');
  });
});