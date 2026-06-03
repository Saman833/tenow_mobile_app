import { TenowConfig } from '../core/config/TenowConfig';
import { BackendRoutes } from '../infrastructure/api/BackendRoutes';
import { ClassroomsApi } from '../infrastructure/api/ClassroomsApi';
import { HttpClient } from '../infrastructure/api/HttpClient';
import { HomeViewModel } from '../presentation/screens/home/HomeViewModel';

export class ServiceContainer {
  readonly config: TenowConfig;
  readonly backendRoutes: BackendRoutes;
  readonly httpClient: HttpClient;
  readonly classroomsApi: ClassroomsApi;

  private constructor(config: TenowConfig) {
    this.config = config;
    this.backendRoutes = new BackendRoutes();
    this.httpClient = new HttpClient(config.apiBaseUrl);
    this.classroomsApi = new ClassroomsApi(this.httpClient, this.backendRoutes);
  }

  static create(config: TenowConfig = TenowConfig.createDefault()): ServiceContainer {
    return new ServiceContainer(config);
  }

  createHomeViewModel(): HomeViewModel {
    return new HomeViewModel(this.config);
  }
}
