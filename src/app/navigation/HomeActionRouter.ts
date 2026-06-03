import { RootRoutes, TabRoutes } from './AppRoutes';
import type { MainTabParamList } from './AppRoutes';

type MainTabRouteName = keyof MainTabParamList;

export type HomeActionTarget =
  | { type: 'tab'; route: MainTabRouteName }
  | { type: 'createOrganization'; route: typeof RootRoutes.CreateOrganization };

export class HomeActionRouter {
  resolve(actionId: string): HomeActionTarget | null {
    switch (actionId) {
      case 'join-class':
      case 'create-class':
        return { type: 'tab', route: TabRoutes.Classes };
      case 'create-organization':
        return {
          type: 'createOrganization',
          route: RootRoutes.CreateOrganization,
        };
      default:
        return null;
    }
  }
}
