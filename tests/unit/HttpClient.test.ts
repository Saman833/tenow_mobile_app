import { AppError, HttpClient } from '#shared';

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

  it('attaches bearer token when provider is configured', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ ok: true }),
    } as Response);

    const client = new HttpClient('http://localhost:3000', async () => 'token-123');
    await client.request('/classrooms/mine');

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3000/classrooms/mine',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer token-123',
        }),
      }),
    );
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
