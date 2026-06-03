import { TenowConfig } from '../core/config/TenowConfig';
import { HttpClient } from '../infrastructure/api/HttpClient';
import { HomeViewModel } from '../presentation/screens/home/HomeViewModel';

export class ServiceContainer {
  readonly config: TenowConfig;
  readonly httpClient: HttpClient;

  private constructor(config: TenowConfig) {
    this.config = config;
    this.httpClient = new HttpClient(config.apiBaseUrl);
  }

  static create(config: TenowConfig = TenowConfig.createDefault()): ServiceContainer {
    return new ServiceContainer(config);
  }

  createHomeViewModel(): HomeViewModel {
    return new HomeViewModel(this.config);
  }
}
