import { ServiceContainer } from '../../src/application/ServiceContainer';
import { TenowConfig } from '../../src/core/config/TenowConfig';

describe('ServiceContainer smoke', () => {
  it('creates a wired home view model', () => {
    const config = new TenowConfig({
      appName: 'TeNow',
      tagline: 'Test tagline',
      apiBaseUrl: 'http://localhost:3000',
    });
    const container = ServiceContainer.create(config);
    const viewModel = container.createHomeViewModel();

    expect(viewModel.appName).toBe('TeNow');
    expect(viewModel.actions).toHaveLength(3);
    expect(container.backendRoutes.classroomsMine).toBe('/classrooms/mine');
    expect(container.classroomsApi).toBeDefined();
  });
});
