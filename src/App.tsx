import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppBootstrap } from './application/AppBootstrap';
import { HomeScreen } from './presentation/screens/home/HomeScreen';

export default function App() {
  const bootstrap = AppBootstrap.initialize();
  const viewModel = bootstrap.container.createHomeViewModel();

  return (
    <SafeAreaProvider>
      <HomeScreen viewModel={viewModel} />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
