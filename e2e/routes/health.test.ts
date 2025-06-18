import { expect, test } from '@playwright/test';

const baseURL = process.env.API_BASE_URL || 'http://localhost:3000';

test.describe('Health Route', () => {
  test('GET /health returns 200 and correct body', async ({
    request
  }) => {
    const response = await request.get(`${baseURL}/health`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toEqual({
      message: 'Service is healthy',
      status: 200
    });
  });
});
