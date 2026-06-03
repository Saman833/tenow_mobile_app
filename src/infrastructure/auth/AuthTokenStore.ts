import * as SecureStore from 'expo-secure-store';

export interface AuthTokenStore {
  getToken(): Promise<string | null>;
  saveToken(token: string): Promise<void>;
  clearToken(): Promise<void>;
}

export class SecureAuthTokenStore implements AuthTokenStore {
  private readonly key = 'tenow.auth.accessToken';

  getToken(): Promise<string | null> {
    return SecureStore.getItemAsync(this.key);
  }

  saveToken(token: string): Promise<void> {
    return SecureStore.setItemAsync(this.key, token);
  }

  clearToken(): Promise<void> {
    return SecureStore.deleteItemAsync(this.key);
  }
}
