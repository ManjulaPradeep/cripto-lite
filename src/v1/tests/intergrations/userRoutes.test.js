// tests/integration/userRoutes.test.js

const request = require('supertest');
const app = require('../../index');

describe('User Routes Integration Tests', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('email', 'test@example.com');
  });

  it('should log in a user', async () => {
    const response = await request(app)
      .post('/api/v1/users/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

});
