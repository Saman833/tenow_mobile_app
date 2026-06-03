import { HomeViewModel } from '#features/home';
import { TenowConfig } from '#shared';

describe('HomeViewModel', () => {
  const viewModel = new HomeViewModel(
    new TenowConfig({
      appName: 'TeNow',
      tagline: 'AI-native learning',
      apiBaseUrl: 'http://localhost:3000',
    }),
  );

  it('exposes workspace welcome copy', () => {
    expect(viewModel.welcomeHeadline).toBe('Welcome back');
    expect(viewModel.workspaceSubtitle).toContain('workspace');
  });

  it('exposes get started actions aligned with web dashboard', () => {
    expect(viewModel.getStartedTitle).toBe('Get started');
    expect(viewModel.actions).toHaveLength(1);
    expect(viewModel.actions.map((action) => action.id)).toEqual([
      'create-organization',
    ]);
  });
});
