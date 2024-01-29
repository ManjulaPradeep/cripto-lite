// tests/integration/coinRoutes.test.js

const request = require('supertest');
const app = require('../../index');

describe('Coin Routes Integration Tests', () => {
  it('should get the coin list', async () => {
    const response = await request(app)
      .get('/api/v1/coins/coinList');

    expect(response.status).toBe(200);
  });

  it('should get the price list', async () => {
    const response = await request(app)
      .get('/api/v1/coins/priceList');

    expect(response.status).toBe(200);
  });
});
