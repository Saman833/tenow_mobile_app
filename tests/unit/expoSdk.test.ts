import * as fs from 'node:fs';
import * as path from 'node:path';

const PROJECT_ROOT = path.join(__dirname, '../..');

function readProjectFile(relativePath: string): string {
  return fs.readFileSync(path.join(PROJECT_ROOT, relativePath), 'utf8');
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(readProjectFile(relativePath)) as T;
}

describe('Expo SDK 56 project setup', () => {
  it('uses legacy-peer-deps in .npmrc for npm install compatibility', () => {
    const npmrc = readProjectFile('.npmrc');

    expect(npmrc).toMatch(/legacy-peer-deps\s*=\s*true/);
  });

  it('pins core dependencies to Expo SDK 56', () => {
    const pkg = readJson<{
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
    }>('package.json');

    expect(pkg.dependencies.expo).toMatch(/^~56\./);
    expect(pkg.dependencies['@expo/metro-runtime']).toMatch(/^~56\./);
    expect(pkg.dependencies['expo-secure-store']).toMatch(/^~56\./);
    expect(pkg.dependencies['expo-status-bar']).toMatch(/^~56\./);
    expect(pkg.devDependencies['jest-expo']).toMatch(/^~56\./);
  });

  it('keeps React Native on the Expo 56 supported release', () => {
    const pkg = readJson<{ dependencies: Record<string, string> }>(
      'package.json',
    );

    expect(pkg.dependencies['react-native']).toMatch(/^0\.85\./);
    expect(pkg.dependencies.react).toMatch(/^19\./);
  });

  it('includes jest-expo peer dependency for SDK 56 tests', () => {
    const pkg = readJson<{
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
    }>('package.json');

    const jestPreset =
      pkg.dependencies['@react-native/jest-preset'] ??
      pkg.devDependencies['@react-native/jest-preset'];

    expect(jestPreset).toMatch(/^(\^|~)?0\.85\./);
    expect(pkg.devDependencies['jest-expo']).toMatch(/^~56\./);
  });

  it('documents public API env vars in .env.example', () => {
    const envExample = readProjectFile('.env.example');

    expect(envExample).toContain('EXPO_PUBLIC_API_URL');
  });

  it('configures app.json for Expo SDK 56 plugins', () => {
    const appJson = readJson<{
      expo: { plugins?: string[]; android?: { package?: string } };
    }>('app.json');

    expect(appJson.expo.plugins).toContain('expo-secure-store');
    expect(appJson.expo.android?.package).toBe('com.tenow.mobile');
  });
});
