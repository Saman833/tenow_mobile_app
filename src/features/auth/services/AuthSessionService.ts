import { AuthTokenStore } from '#shared';
import { AuthApi } from '../api/AuthApi';
import {
  AuthSession,
  AuthUser,
  SignInCredentials,
  SignUpCredentials,
} from '../model/AuthSession';

export class AuthSessionService {
  constructor(
    private readonly authApi: AuthApi,
    private readonly tokenStore: AuthTokenStore,
  ) {}

  async signIn(credentials: SignInCredentials): Promise<AuthSession> {
    const session = await this.authApi.signIn(credentials);
    await this.tokenStore.saveToken(session.accessToken);
    return session;
  }

  async signUp(credentials: SignUpCredentials): Promise<AuthSession> {
    const session = await this.authApi.signUp(credentials);
    await this.tokenStore.saveToken(session.accessToken);
    return session;
  }

  async restoreUser(): Promise<AuthUser | null> {
    const token = await this.tokenStore.getToken();

    if (!token) {
      return null;
    }

    try {
      return await this.authApi.me(token);
    } catch {
      await this.tokenStore.clearToken();
      return null;
    }
  }

  async logout(): Promise<void> {
    const token = await this.tokenStore.getToken();

    if (token) {
      await this.authApi.logout(token);
    }

    await this.tokenStore.clearToken();
  }
}
