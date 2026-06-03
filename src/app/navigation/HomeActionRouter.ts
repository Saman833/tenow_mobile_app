import { SettingsRoutes, TabRoutes } from './AppRoutes';
import type { MainTabParamList } from './AppRoutes';

type MainTabRouteName = keyof MainTabParamList;

export type HomeActionTarget =
  | { type: 'tab'; route: MainTabRouteName }
  | {
      type: 'settingsScreen';
      screen: typeof SettingsRoutes.CreateOrganization;
    };

export class HomeActionRouter {
  resolve(actionId: string): HomeActionTarget | null {
    switch (actionId) {
      case 'join-class':
      case 'create-class':
        return { type: 'tab', route: TabRoutes.Classes };
      case 'create-organization':
        return {
          type: 'settingsScreen',
          screen: SettingsRoutes.CreateOrganization,
        };
      default:
        return null;
    }
  }
}
