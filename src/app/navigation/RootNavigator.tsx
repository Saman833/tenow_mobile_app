import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { SignInScreen, SignUpScreen } from '#features/auth';
import { ClassDetailScreen, ClassesListScreen } from '#features/classes';
import { HomeScreen } from '#features/home';
import { CreateOrganizationScreen } from '#features/orgs';
import { SettingsScreen } from '#features/settings';
import { theme } from '#shared';
import {
  AppRouteRegistry,
  AuthRoutes,
  AuthStackParamList,
  ClassesStackParamList,
  ClassRoutes,
  MainTabParamList,
  RootRoutes,
  RootStackParamList,
  TabRoutes,
} from './AppRoutes';
import { HomeActionRouter } from './HomeActionRouter';
import { ServiceContainer } from '../di/ServiceContainer';

interface RootNavigatorProps {
  container: ServiceContainer;
  routeRegistry?: AppRouteRegistry;
}

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();
const ClassesStack = createNativeStackNavigator<ClassesStackParamList>();
const homeActionRouter = new HomeActionRouter();

export function RootNavigator({
  container,
  routeRegistry = new AppRouteRegistry(),
}: RootNavigatorProps) {
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    container.authSessionService.restoreUser().then((user) => {
      if (isMounted) {
        setIsAuthenticated(Boolean(user));
        setIsReady(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [container.authSessionService]);

  const handleAuthenticated = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(async () => {
    await container.authSessionService.logout();
    setIsAuthenticated(false);
  }, [container.authSessionService]);

  if (!isReady) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <RootStack.Screen name={RootRoutes.MainTabs}>
              {({ navigation }) => (
                <MainTabs
                  container={container}
                  onCreateOrganization={() =>
                    navigation.navigate(RootRoutes.CreateOrganization)
                  }
                  onLogout={handleLogout}
                  routeRegistry={routeRegistry}
                />
              )}
            </RootStack.Screen>
            <RootStack.Screen name={RootRoutes.CreateOrganization}>
              {({ navigation }) => (
                <CreateOrganizationScreen
                  viewModel={container.createOrganizationViewModel()}
                  authSessionService={container.authSessionService}
                  onCreated={() =>
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [
                          {
                            name: RootRoutes.MainTabs,
                            params: { screen: TabRoutes.Home },
                          },
                        ],
                      }),
                    )
                  }
                  onCancel={() => navigation.goBack()}
                />
              )}
            </RootStack.Screen>
          </>
        ) : (
          <RootStack.Screen name={RootRoutes.AuthStack}>
            {() => (
              <AuthNavigator
                container={container}
                onAuthenticated={handleAuthenticated}
                routeRegistry={routeRegistry}
              />
            )}
          </RootStack.Screen>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

interface MainTabsProps {
  container: ServiceContainer;
  onCreateOrganization: () => void;
  onLogout: () => void;
  routeRegistry: AppRouteRegistry;
}

function MainTabs({
  container,
  onCreateOrganization,
  onLogout,
  routeRegistry,
}: MainTabsProps) {
  return (
    <Tabs.Navigator
      initialRouteName={routeRegistry.tabInitialRoute}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarIcon: () => null,
        tabBarIconStyle: styles.hiddenTabIcon,
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen name={TabRoutes.Home} options={{ title: 'Home' }}>
        {(props) => (
          <HomeTabScreen
            {...props}
            container={container}
            onCreateOrganization={onCreateOrganization}
          />
        )}
      </Tabs.Screen>
      <Tabs.Screen name={TabRoutes.Classes} options={{ title: 'Classes' }}>
        {() => (
          <ClassesNavigator
            container={container}
            routeRegistry={routeRegistry}
          />
        )}
      </Tabs.Screen>
      <Tabs.Screen name={TabRoutes.Settings} options={{ title: 'Settings' }}>
        {() => (
          <SettingsScreen
            onCreateOrganization={onCreateOrganization}
            onLogout={onLogout}
          />
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}

interface AuthNavigatorProps {
  container: ServiceContainer;
  onAuthenticated: () => void;
  routeRegistry: AppRouteRegistry;
}

function AuthNavigator({
  container,
  onAuthenticated,
  routeRegistry,
}: AuthNavigatorProps) {
  return (
    <AuthStack.Navigator
      initialRouteName={routeRegistry.authInitialRoute}
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name={AuthRoutes.SignIn}>
        {({ navigation }) => (
          <SignInScreen
            authSessionService={container.authSessionService}
            onAuthenticated={onAuthenticated}
            onCreateAccount={() => navigation.navigate(AuthRoutes.SignUp)}
          />
        )}
      </AuthStack.Screen>
      <AuthStack.Screen name={AuthRoutes.SignUp}>
        {({ navigation }) => (
          <SignUpScreen
            authSessionService={container.authSessionService}
            onAuthenticated={onAuthenticated}
            onSignIn={() => navigation.navigate(AuthRoutes.SignIn)}
          />
        )}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
}

function LoadingScreen() {
  return (
    <View style={styles.loading} testID="auth-loading-screen">
      <ActivityIndicator color={theme.colors.primary} />
    </View>
  );
}

type HomeTabScreenProps = BottomTabScreenProps<
  MainTabParamList,
  typeof TabRoutes.Home
> & {
  container: ServiceContainer;
  onCreateOrganization: () => void;
};

function HomeTabScreen({
  container,
  navigation,
  onCreateOrganization,
}: HomeTabScreenProps) {
  return (
    <HomeScreen
      viewModel={container.createHomeViewModel()}
      onActionPress={(actionId) => {
        const target = homeActionRouter.resolve(actionId);

        if (!target) {
          return;
        }

        if (target.type === 'tab') {
          navigation.jumpTo(target.route);
          return;
        }

        onCreateOrganization();
      }}
    />
  );
}

interface ClassesNavigatorProps {
  container: ServiceContainer;
  routeRegistry: AppRouteRegistry;
}

function ClassesNavigator({ container, routeRegistry }: ClassesNavigatorProps) {
  return (
    <ClassesStack.Navigator
      initialRouteName={routeRegistry.classesInitialRoute}
      screenOptions={{ headerShown: false }}
    >
      <ClassesStack.Screen name={ClassRoutes.ClassList}>
        {(props) => (
          <ClassesListScreen
            {...props}
            classroomsApi={container.classroomsApi}
          />
        )}
      </ClassesStack.Screen>
      <ClassesStack.Screen name={ClassRoutes.ClassDetail}>
        {(props) => (
          <ClassDetailScreen
            {...props}
            classroomsApi={container.classroomsApi}
          />
        )}
      </ClassesStack.Screen>
    </ClassesStack.Navigator>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  hiddenTabIcon: {
    display: 'none',
  },
  tabBar: {
    height: 56,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
