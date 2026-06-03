import { TenowConfig } from '../../src/core/config/TenowConfig';
import { HomeViewModel } from '../../src/presentation/screens/home/HomeViewModel';

describe('HomeViewModel smoke', () => {
  it('exposes TeNow branding copy', () => {
    const config = new TenowConfig({
      appName: 'TeNow',
      tagline: 'AI-native learning for teachers and students',
      apiBaseUrl: 'http://localhost:3000',
    });
    const viewModel = new HomeViewModel(config);

    expect(viewModel.appName).toBe('TeNow');
    expect(viewModel.welcomeTitle).toBe('Welcome to TeNow');
    expect(viewModel.featureHighlights).toHaveLength(3);
  });
});
