import { expect, test } from '@playwright/test';

test.describe('/rules endpoint', () => {
  test('GET /rules returns grouped rules with total', async ({
    request
  }) => {
    const res = await request.get('/rules');
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty('data');
    expect(body).toHaveProperty('total');
    expect(Array.isArray(body.data)).toBe(true);
    expect(typeof body.total).toBe('number');

    // Optional: Check group structure
    const firstGroup = body.data[0];
    expect(firstGroup).toHaveProperty('title');
    expect(firstGroup).toHaveProperty('rules');
    expect(Array.isArray(firstGroup.rules)).toBe(true);
  });

  test('GET /rules?limit=5&skip=0 returns 5 items max in all groups combined', async ({
    request
  }) => {
    const res = await request.get('/rules?limit=5&skip=0');
    expect(res.status()).toBe(200);
    const body = await res.json();

    const allRules = body.data.flatMap((group: any) => group.rules);
    expect(allRules.length).toBeLessThanOrEqual(5);
  });

  test('GET /rules?grouped=false returns ungrouped rules', async ({
    request
  }) => {
    const res = await request.get('/rules?grouped=false');
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty('data');
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);

    // Check that rules are not grouped
    body.data.forEach((rule: any) => {
      expect(rule).toHaveProperty('title');
      expect(rule).toHaveProperty('id');
      expect(rule).toHaveProperty('content');
      expect(rule).toHaveProperty('toc');
      expect(rule).not.toHaveProperty('rules');
    });
  });

  test('GET /rules?grouped=true returns ungrouped rules', async ({
    request
  }) => {
    const res = await request.get('/rules?grouped=true');
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty('data');
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);

    body.data.forEach((rule: any) => {
      expect(rule).toHaveProperty('title');
      expect(rule).not.toHaveProperty('id');
      expect(rule).not.toHaveProperty('content');
      expect(rule).not.toHaveProperty('toc');
      expect(rule).toHaveProperty('rules');
    });
  });
});
