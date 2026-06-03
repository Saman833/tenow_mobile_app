import { AppError } from '../../src/core/errors/AppError';
import { HttpClient } from '../../src/infrastructure/api/HttpClient';

describe('HttpClient', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns parsed JSON on success', async () => {
    const payload = { ok: true };
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => payload,
    } as Response);

    const client = new HttpClient('http://localhost:3000');
    await expect(client.request('/health')).resolves.toEqual(payload);
  });

  it('throws AppError when the response is not ok', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    const client = new HttpClient('http://localhost:3000');
    await expect(client.request('/health')).rejects.toBeInstanceOf(AppError);
  });
});
