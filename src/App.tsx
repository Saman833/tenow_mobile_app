import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppBootstrap, RootNavigator } from '#app';

export default function App() {
  const bootstrap = AppBootstrap.initialize();

  return (
    <SafeAreaProvider>
      <RootNavigator container={bootstrap.container} />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
