import type { NavigatorScreenParams } from '@react-navigation/native';

export const RootRoutes = {
  AuthStack: 'AuthStack',
  MainTabs: 'MainTabs',
  CreateOrganization: 'CreateOrganization',
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
  CreateClass: 'CreateClass',
  JoinClass: 'JoinClass',
} as const;

export const SettingsRoutes = {
  CreateOrganization: 'CreateOrganization',
} as const;

export type RootStackParamList = {
  [RootRoutes.AuthStack]: undefined;
  [RootRoutes.MainTabs]: NavigatorScreenParams<MainTabParamList> | undefined;
  [RootRoutes.CreateOrganization]: undefined;
};

export type AuthStackParamList = {
  [AuthRoutes.SignIn]: undefined;
  [AuthRoutes.SignUp]: undefined;
};

export type MainTabParamList = {
  [TabRoutes.Home]: undefined;
  [TabRoutes.Classes]: undefined;
  [TabRoutes.Settings]: undefined;
};

export type ClassesStackParamList = {
  [ClassRoutes.ClassList]: undefined;
  [ClassRoutes.ClassDetail]: { classId: string };
  [ClassRoutes.CreateClass]: undefined;
  [ClassRoutes.JoinClass]: undefined;
};

export class AppRouteRegistry {
  readonly rootInitialRoute = RootRoutes.AuthStack;
  readonly authInitialRoute = AuthRoutes.SignIn;
  readonly tabInitialRoute = TabRoutes.Home;
  readonly classesInitialRoute = ClassRoutes.ClassList;
}
