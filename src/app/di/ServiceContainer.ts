import { AuthApi, AuthSessionService } from '#features/auth';
import { ClassroomsApi } from '#features/classes';
import { HomeViewModel } from '#features/home';
import { OrganizationsApi, CreateOrganizationViewModel } from '#features/orgs';
import {
  BackendRoutes,
  ClipboardAccess,
  ExpoClipboardAccess,
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
  readonly organizationsApi: OrganizationsApi;
  readonly clipboard: ClipboardAccess;

  private readonly tokenStore: SecureAuthTokenStore;

  private constructor(config: TenowConfig) {
    this.config = config;
    this.backendRoutes = new BackendRoutes();
    this.tokenStore = new SecureAuthTokenStore();
    this.clipboard = new ExpoClipboardAccess();
    this.httpClient = new HttpClient(config.apiBaseUrl, () =>
      this.tokenStore.getToken(),
    );
    this.authApi = new AuthApi(this.httpClient, this.backendRoutes);
    this.authSessionService = new AuthSessionService(
      this.authApi,
      this.tokenStore,
    );
    this.classroomsApi = new ClassroomsApi(this.httpClient, this.backendRoutes);
    this.organizationsApi = new OrganizationsApi(
      this.httpClient,
      this.backendRoutes,
    );
  }

  static create(config: TenowConfig = TenowConfig.createDefault()): ServiceContainer {
    return new ServiceContainer(config);
  }

  createHomeViewModel(): HomeViewModel {
    return new HomeViewModel(this.config);
  }

  createOrganizationViewModel(): CreateOrganizationViewModel {
    return new CreateOrganizationViewModel(this.organizationsApi);
  }
}
