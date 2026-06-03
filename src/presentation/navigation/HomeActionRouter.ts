import { MainTabParamList, TabRoutes } from './AppRoutes';

type MainTabRouteName = keyof MainTabParamList;

export class HomeActionRouter {
  resolveTabRoute(actionId: string): MainTabRouteName | null {
    switch (actionId) {
      case 'join-class':
      case 'create-class':
        return TabRoutes.Classes;
      case 'create-organization':
        return TabRoutes.Settings;
      default:
        return null;
    }
  }
}
