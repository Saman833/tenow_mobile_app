import { BackendRoutes, HttpClient } from '#shared';
import {
  AuthSession,
  AuthUser,
  SignInCredentials,
  SignUpCredentials,
} from '../model/AuthSession';

export class AuthApi {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly routes: BackendRoutes,
  ) {}

  signIn(credentials: SignInCredentials): Promise<AuthSession> {
    return this.httpClient.request<AuthSession>(this.routes.authLogin, {
      method: 'POST',
      body: credentials,
      authenticated: false,
    });
  }

  signUp(credentials: SignUpCredentials): Promise<AuthSession> {
    return this.httpClient.request<AuthSession>(this.routes.authSignup, {
      method: 'POST',
      body: credentials,
      authenticated: false,
    });
  }

  me(accessToken: string): Promise<AuthUser> {
    return this.httpClient.request<AuthUser>(this.routes.authMe, {
      headers: this.authHeaders(accessToken),
    });
  }

  logout(accessToken: string): Promise<void> {
    return this.httpClient.request<void>(this.routes.authLogout, {
      method: 'POST',
      headers: this.authHeaders(accessToken),
    });
  }

  private authHeaders(accessToken: string): Record<string, string> {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }
}
