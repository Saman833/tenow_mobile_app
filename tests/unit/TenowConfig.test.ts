import { TenowConfig } from '../../src/core/config/TenowConfig';

describe('TenowConfig', () => {
  it('strips trailing slashes from the API base URL', () => {
    const config = new TenowConfig({
      appName: 'TeNow',
      tagline: 'Tagline',
      apiBaseUrl: 'http://localhost:3000/',
    });

    expect(config.apiBaseUrl).toBe('http://localhost:3000');
    expect(config.resolveApiPath('/classes')).toBe(
      'http://localhost:3000/classes',
    );
  });

  it('creates sensible defaults', () => {
    const config = TenowConfig.createDefault();

    expect(config.appName).toBe('TeNow');
    expect(config.tagline).toContain('AI-native');
    expect(config.apiBaseUrl).toBe('http://localhost:4000');
  });

  it('uses Expo public API URL when provided', () => {
    process.env.EXPO_PUBLIC_API_URL = 'http://192.168.1.20:4000/';

    const config = TenowConfig.createDefault();

    expect(config.apiBaseUrl).toBe('http://192.168.1.20:4000');

    delete process.env.EXPO_PUBLIC_API_URL;
  });
});
