export interface TenowConfigOptions {
  appName: string;
  tagline: string;
  apiBaseUrl: string;
}

export class TenowConfig {
  readonly appName: string;
  readonly tagline: string;
  readonly apiBaseUrl: string;

  constructor(options: TenowConfigOptions) {
    this.appName = options.appName;
    this.tagline = options.tagline;
    this.apiBaseUrl = options.apiBaseUrl.replace(/\/$/, '');
  }

  static createDefault(): TenowConfig {
    return new TenowConfig({
      appName: 'TeNow',
      tagline: 'AI-native learning for teachers and students',
      apiBaseUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000',
    });
  }

  resolveApiPath(path: string): string {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.apiBaseUrl}${normalizedPath}`;
  }
}
