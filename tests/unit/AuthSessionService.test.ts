import { AuthSessionService } from '../../src/application/AuthSessionService';
import { AuthApi } from '../../src/infrastructure/api/AuthApi';
import { AuthTokenStore } from '../../src/infrastructure/auth/AuthTokenStore';

describe('AuthSessionService', () => {
  const createService = () => {
    const authApi = {
      signIn: jest.fn(),
      signUp: jest.fn(),
      me: jest.fn(),
      logout: jest.fn(),
    } as unknown as AuthApi;
    const tokenStore: AuthTokenStore = {
      getToken: jest.fn(),
      saveToken: jest.fn(),
      clearToken: jest.fn(),
    };

    return {
      service: new AuthSessionService(authApi, tokenStore),
      authApi: authApi as jest.Mocked<AuthApi>,
      tokenStore: tokenStore as jest.Mocked<AuthTokenStore>,
    };
  };

  it('stores token after sign in', async () => {
    const { service, authApi, tokenStore } = createService();
    authApi.signIn.mockResolvedValue({
      accessToken: 'token',
      role: 'student',
    });

    await service.signIn({
      email: 'student@tenow.test',
      password: 'password123',
    });

    expect(tokenStore.saveToken).toHaveBeenCalledWith('token');
  });

  it('restores user with stored token', async () => {
    const { service, authApi, tokenStore } = createService();
    tokenStore.getToken.mockResolvedValue('token');
    authApi.me.mockResolvedValue({ role: 'student' });

    await expect(service.restoreUser()).resolves.toEqual({ role: 'student' });

    expect(authApi.me).toHaveBeenCalledWith('token');
  });

  it('clears invalid stored token', async () => {
    const { service, authApi, tokenStore } = createService();
    tokenStore.getToken.mockResolvedValue('bad-token');
    authApi.me.mockRejectedValue(new Error('unauthorized'));

    await expect(service.restoreUser()).resolves.toBeNull();

    expect(tokenStore.clearToken).toHaveBeenCalledTimes(1);
  });
});
