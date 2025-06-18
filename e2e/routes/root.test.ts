import { expect, test } from '@playwright/test';
import pkg from '../../package.json' assert { type: 'json' };

const baseURL = process.env.API_BASE_URL || 'http://localhost:3000';

test.describe('Root Route', () => {
  test('GET / returns expected metadata', async ({ request }) => {
    const response = await request.get(`${baseURL}/`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toEqual({
      name: pkg.name,
      version: pkg.version,
      description: pkg.description,
      author: pkg.author,
      repository: pkg.repository,
      license: pkg.license,
      docs: 'https://realgolf.games/developer/docs',
      status: 200
    });
  });
});
