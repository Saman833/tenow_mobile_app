import { AuthApi, AuthSessionService } from '#features/auth';
import { ClassroomsApi } from '#features/classes';
import { HomeViewModel } from '#features/home';
import {
  BackendRoutes,
  HttpClient,
  SecureAuthTokenStore,
  TenowConfig,
} from '#shared';

export class ServiceContainer {
  readonly config: TenowConfig;
  readonly backendRoutes: BackendRoutes;
  readonly httpClient: HttpClient;
  readonly authApi: AuthApi;
  readonly authSessionService: AuthSessionService;
  readonly classroomsApi: ClassroomsApi;

  private constructor(config: TenowConfig) {
    this.config = config;
    this.backendRoutes = new BackendRoutes();
    this.httpClient = new HttpClient(config.apiBaseUrl);
    this.authApi = new AuthApi(this.httpClient, this.backendRoutes);
    this.authSessionService = new AuthSessionService(
      this.authApi,
      new SecureAuthTokenStore(),
    );
    this.classroomsApi = new ClassroomsApi(this.httpClient, this.backendRoutes);
  }

  static create(config: TenowConfig = TenowConfig.createDefault()): ServiceContainer {
    return new ServiceContainer(config);
  }

  createHomeViewModel(): HomeViewModel {
    return new HomeViewModel(this.config);
  }
}
