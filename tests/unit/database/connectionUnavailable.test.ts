import { describe, test, expect, beforeEach, spyOn } from 'bun:test';
import { resetNatives, setConvar } from '../../setup';
import { resetDb, setConnectionFactory } from '../../helpers/db';
import * as config from 'config';

const { createConnectionPool } = await import('database/pool');
await createConnectionPool();
const { rawQuery } = await import('database/rawQuery');
const { rawExecute } = await import('database/rawExecute');
const { rawTransaction } = await import('database/rawTransaction');
const { startTransaction } = await import('database/startTransaction');

// WHIPFX P-001: when the pool cannot hand out a connection (database down or restarting),
// every entry point must answer its caller with an error instead of leaving it waiting.
beforeEach(() => {
  resetNatives();
  setConvar('mysql_debug', 'false');
  config.setDebug();
  resetDb();
  spyOn(console, 'error').mockImplementation(() => {});
  setConnectionFactory(() => {
    throw new Error('connect ECONNREFUSED 127.0.0.1:3306');
  });
});

type Answer = { result: unknown; error: unknown };

const answer = () => {
  const a: Answer = { result: undefined, error: undefined };
  const cb = (result: unknown, error?: unknown) => {
    a.result = result;
    a.error = error;
  };
  return { a, cb };
};

describe('no database connection', () => {
  test('rawQuery answers the promise caller with an error', async () => {
    const { a, cb } = answer();
    await rawQuery(null, 'res', 'SELECT 1', [], cb, true);
    expect(a.result).toBeNull();
    expect(String(a.error)).toContain('ECONNREFUSED');
  });

  test('rawExecute answers the promise caller with an error', async () => {
    const { a, cb } = answer();
    await rawExecute('res', 'SELECT ?', [1], cb, true);
    expect(a.result).toBeNull();
    expect(String(a.error)).toContain('ECONNREFUSED');
  });

  test('rawTransaction answers the promise caller with an error', async () => {
    const { a, cb } = answer();
    await rawTransaction('res', ['INSERT INTO t VALUES (1)'] as any, [], cb, true);
    expect(a.result).toBeNull();
    expect(String(a.error)).toContain('ECONNREFUSED');
  });

  test('startTransaction answers the promise caller with an error', async () => {
    const { a, cb } = answer();
    let ran = false;
    await startTransaction(
      'res',
      async () => {
        ran = true;
        return true;
      },
      cb,
      true,
    );
    expect(ran).toBe(false);
    expect(a.result).toBeNull();
    expect(String(a.error)).toContain('ECONNREFUSED');
  });

  test('none of them reject', async () => {
    await expect(rawQuery(null, 'res', 'SELECT 1', [])).resolves.toBeUndefined();
    await expect(rawExecute('res', 'SELECT 1', [])).resolves.toBeUndefined();
    await expect(rawTransaction('res', ['SELECT 1'] as any, [])).resolves.toBeUndefined();
    await expect(startTransaction('res', async () => true)).resolves.toBeUndefined();
  });
});
