// tests/integration/userFavoritesRoutes.test.js

const request = require('supertest');
const app = require('../../index');

describe('User Favorites Routes Integration Tests', () => {
  let authToken;  // Store the authentication token for testing secured routes

  beforeAll(async () => {
    // Log in a user and obtain the authentication token
    const loginResponse = await request(app)
      .post('/api/v1/users/login')
      .send({ email: 'test@example.com', password: 'password123' });

    authToken = loginResponse.body.token;
  });

  it('should get user favorites', async () => {
    const response = await request(app)
      .get('/api/v1/userFavorites/1')  // Assuming 1 is the user_id for testing
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    // additional assertions 
  });

  it('should create user favorites', async () => {
    const response = await request(app)
      .post('/api/v1/userFavorites/create')
      .send({ crypto_id: 1, user_id: 1 })  // Assuming 1 is the user_id for testing
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    // additional assertions
  });

  it('should update user favorites', async () => {
    const response = await request(app)
      .put('/api/v1/userFavorites/update')
      .send({ id: 1, crypto_id: 2, user_id: 1 })  // Assuming 1 is the user_id for testing
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    // additional assertions
  });

  it('should delete user favorites', async () => {
    const response = await request(app)
      .delete('/api/v1/userFavorites/delete')
      .send({ id: 1, user_id: 1 })  // Assuming 1 is the user_id for testing
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    // additional assertions
  });
});
