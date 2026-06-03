import { ServiceContainer } from '../di/ServiceContainer';

export class AppBootstrap {
  private static instance: AppBootstrap | null = null;

  readonly container: ServiceContainer;

  private constructor(container: ServiceContainer) {
    this.container = container;
  }

  static initialize(container?: ServiceContainer): AppBootstrap {
    if (!AppBootstrap.instance) {
      AppBootstrap.instance = new AppBootstrap(
        container ?? ServiceContainer.create(),
      );
    }
    return AppBootstrap.instance;
  }

  static reset(): void {
    AppBootstrap.instance = null;
  }
}
