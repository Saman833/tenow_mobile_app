export const RootRoutes = {
  MainTabs: 'MainTabs',
} as const;

export const TabRoutes = {
  Home: 'HomeTab',
  Classes: 'ClassesTab',
  Settings: 'SettingsTab',
} as const;

export const ClassRoutes = {
  ClassList: 'ClassList',
  ClassDetail: 'ClassDetail',
} as const;

export type RootStackParamList = {
  [RootRoutes.MainTabs]: undefined;
};

export type MainTabParamList = {
  [TabRoutes.Home]: undefined;
  [TabRoutes.Classes]: undefined;
  [TabRoutes.Settings]: undefined;
};

export type ClassesStackParamList = {
  [ClassRoutes.ClassList]: undefined;
  [ClassRoutes.ClassDetail]: { classId: string };
};

export class AppRouteRegistry {
  readonly rootInitialRoute = RootRoutes.MainTabs;
  readonly tabInitialRoute = TabRoutes.Home;
  readonly classesInitialRoute = ClassRoutes.ClassList;
}
