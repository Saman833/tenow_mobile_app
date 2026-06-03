import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  ScreenContainer,
  ScreenHeader,
  spacing,
} from '#shared';
import {
  SettingsRoutes,
  SettingsStackParamList,
} from '#app/navigation/AppRoutes';

type SettingsScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  typeof SettingsRoutes.SettingsHome
> & {
  onLogout?: () => void;
};

export function SettingsScreen({ navigation, onLogout }: SettingsScreenProps) {
  return (
    <ScreenContainer testID="settings-screen">
      <ScreenHeader
        title="Settings"
        subtitle="Account and workspace preferences."
      />
      <View style={styles.actions}>
        <Button
          label="Create organization"
          variant="secondary"
          testID="settings-create-org"
          onPress={() => navigation.navigate(SettingsRoutes.CreateOrganization)}
        />
        <Button
          label="Log out"
          variant="dangerOutline"
          testID="logout-button"
          onPress={onLogout}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
});
