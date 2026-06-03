import type { NavigatorScreenParams } from '@react-navigation/native';

export const RootRoutes = {
  AuthStack: 'AuthStack',
  MainTabs: 'MainTabs',
} as const;

export const AuthRoutes = {
  SignIn: 'SignIn',
  SignUp: 'SignUp',
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

export const SettingsRoutes = {
  SettingsHome: 'SettingsHome',
  CreateOrganization: 'CreateOrganization',
} as const;

export type RootStackParamList = {
  [RootRoutes.AuthStack]: undefined;
  [RootRoutes.MainTabs]: undefined;
};

export type AuthStackParamList = {
  [AuthRoutes.SignIn]: undefined;
  [AuthRoutes.SignUp]: undefined;
};

export type SettingsStackParamList = {
  [SettingsRoutes.SettingsHome]: undefined;
  [SettingsRoutes.CreateOrganization]: undefined;
};

export type MainTabParamList = {
  [TabRoutes.Home]: undefined;
  [TabRoutes.Classes]: undefined;
  [TabRoutes.Settings]: NavigatorScreenParams<SettingsStackParamList> | undefined;
};

export type ClassesStackParamList = {
  [ClassRoutes.ClassList]: undefined;
  [ClassRoutes.ClassDetail]: { classId: string };
};

export class AppRouteRegistry {
  readonly rootInitialRoute = RootRoutes.AuthStack;
  readonly authInitialRoute = AuthRoutes.SignIn;
  readonly tabInitialRoute = TabRoutes.Home;
  readonly classesInitialRoute = ClassRoutes.ClassList;
  readonly settingsInitialRoute = SettingsRoutes.SettingsHome;
}
