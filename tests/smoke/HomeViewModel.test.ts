import { TenowConfig } from '../../src/core/config/TenowConfig';
import { HomeViewModel } from '../../src/presentation/screens/home/HomeViewModel';

describe('HomeViewModel smoke', () => {
  it('wires dashboard copy for the home screen', () => {
    const viewModel = new HomeViewModel(TenowConfig.createDefault());

    expect(viewModel.appName).toBe('TeNow');
    expect(viewModel.actions).toHaveLength(3);
    expect(viewModel.getStartedTitle).toBe('Get started');
  });
});
