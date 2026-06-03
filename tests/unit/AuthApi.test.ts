import { AuthApi } from '#features/auth';
import { BackendRoutes, HttpClient } from '#shared';

describe('AuthApi', () => {
  const createApi = () => {
    const httpClient = {
      request: jest.fn(),
    } as unknown as HttpClient;

    return {
      api: new AuthApi(httpClient, new BackendRoutes()),
      request: httpClient.request as jest.Mock,
    };
  };

  it('signs in with backend login route', async () => {
    const { api, request } = createApi();
    request.mockResolvedValue({ accessToken: 'token', role: 'student' });

    await api.signIn({ email: 'student@tenow.test', password: 'password123' });

    expect(request).toHaveBeenCalledWith('/auth/login', {
      method: 'POST',
      body: {
        email: 'student@tenow.test',
        password: 'password123',
      },
    });
  });

  it('signs up with backend signup route', async () => {
    const { api, request } = createApi();
    request.mockResolvedValue({ accessToken: 'token', role: 'teacher' });

    await api.signUp({
      name: 'Teacher',
      email: 'teacher@tenow.test',
      password: 'password123',
      role: 'teacher',
    });

    expect(request).toHaveBeenCalledWith('/auth/signup', {
      method: 'POST',
      body: {
        name: 'Teacher',
        email: 'teacher@tenow.test',
        password: 'password123',
        role: 'teacher',
      },
    });
  });

  it('uses bearer token for protected auth routes', async () => {
    const { api, request } = createApi();
    request.mockResolvedValue({ role: 'student' });

    await api.me('token');

    expect(request).toHaveBeenCalledWith('/auth/me', {
      headers: {
        Authorization: 'Bearer token',
      },
    });
  });
});
