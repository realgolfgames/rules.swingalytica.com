import { expect, test } from '@playwright/test';

test.describe('/rules endpoint', () => {
  test('GET /rules?grouped=true returns grouped rules with total', async ({
    request
  }) => {
    const res = await request.get('/rules?grouped=true');
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

  test('GET /rules returns ungrouped rules', async ({ request }) => {
    const res = await request.get('/rules');
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

test('GET /rules?language=en returns warning about language', async ({
  request
}) => {
  const res = await request.get('/rules?language=en');
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body).toHaveProperty('warnings');
  expect(Array.isArray(body.warnings)).toBe(true);
  expect(body.warnings.length).toBeGreaterThan(0);

  const warning = body.warnings.find(
    (w: any) => w.query === 'language'
  );
  expect(warning).toBeDefined();

  expect(warning.message).toMatch(
    /en is currently not supported. Only 'de' is available./i
  );
});

test('GET /rules?limit=-1 returns 400 for invalid limit', async ({
  request
}) => {
  const res = await request.get('/rules?limit=-1');
  expect(res.status()).toBe(400);
});

test('GET /rules?skip=26 returns 400 for invalid skip', async ({
  request
}) => {
  const res = await request.get('/rules?skip=26');
  expect(res.status()).toBe(400);
  const body = await res.json();
  expect(body).toEqual({
    statusCode: 400,
    code: 'FST_ERR_VALIDATION',
    error: 'Bad Request',
    message: 'querystring/skip must be <= 25'
  });
});

test('GET /rules?id=1 returns specific rule by id', async ({
  request
}) => {
  const res = await request.get('/rules?id=1');
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body).toHaveProperty('data');
  expect(Array.isArray(body.data)).toBe(true);
  expect(body.data.length).toBe(1);

  const rule = body.data[0];
  expect(rule).toHaveProperty('order', 1);
  expect(rule).toHaveProperty('title');
  expect(rule).toHaveProperty('content');
  expect(rule).toHaveProperty('toc');
});
