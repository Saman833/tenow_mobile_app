import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { ClassesListScreen } from '../screens/classes/ClassesListScreen';
import { ClassDetailScreen } from '../screens/classes/ClassDetailScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { theme } from '../theme/Theme';
import {
  AppRouteRegistry,
  ClassesStackParamList,
  ClassRoutes,
  MainTabParamList,
  RootRoutes,
  RootStackParamList,
  TabRoutes,
} from './AppRoutes';
import { ServiceContainer } from '../../application/ServiceContainer';

interface RootNavigatorProps {
  container: ServiceContainer;
  routeRegistry?: AppRouteRegistry;
}

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();
const ClassesStack = createNativeStackNavigator<ClassesStackParamList>();

export function RootNavigator({
  container,
  routeRegistry = new AppRouteRegistry(),
}: RootNavigatorProps) {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={routeRegistry.rootInitialRoute}
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name={RootRoutes.MainTabs}>
          {() => <MainTabs container={container} routeRegistry={routeRegistry} />}
        </RootStack.Screen>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

interface MainTabsProps {
  container: ServiceContainer;
  routeRegistry: AppRouteRegistry;
}

function MainTabs({ container, routeRegistry }: MainTabsProps) {
  return (
    <Tabs.Navigator
      initialRouteName={routeRegistry.tabInitialRoute}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
      }}
    >
      <Tabs.Screen name={TabRoutes.Home} options={{ title: 'Home' }}>
        {() => <HomeScreen viewModel={container.createHomeViewModel()} />}
      </Tabs.Screen>
      <Tabs.Screen name={TabRoutes.Classes} options={{ title: 'Classes' }}>
        {() => <ClassesNavigator routeRegistry={routeRegistry} />}
      </Tabs.Screen>
      <Tabs.Screen name={TabRoutes.Settings} component={SettingsScreen} options={{ title: 'Settings' }} />
    </Tabs.Navigator>
  );
}

interface ClassesNavigatorProps {
  routeRegistry: AppRouteRegistry;
}

function ClassesNavigator({ routeRegistry }: ClassesNavigatorProps) {
  return (
    <ClassesStack.Navigator
      initialRouteName={routeRegistry.classesInitialRoute}
      screenOptions={{ headerShown: false }}
    >
      <ClassesStack.Screen
        name={ClassRoutes.ClassList}
        component={ClassesListScreen}
      />
      <ClassesStack.Screen
        name={ClassRoutes.ClassDetail}
        component={ClassDetailScreen}
      />
    </ClassesStack.Navigator>
  );
}
