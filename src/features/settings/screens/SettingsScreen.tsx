import { StyleSheet, View } from 'react-native';
import {
  Button,
  ScreenContainer,
  ScreenHeader,
  spacing,
} from '#shared';

interface SettingsScreenProps {
  onCreateOrganization: () => void;
  onLogout?: () => void;
}

export function SettingsScreen({
  onCreateOrganization,
  onLogout,
}: SettingsScreenProps) {
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
          onPress={onCreateOrganization}
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
  orgCard: {
    marginTop: spacing.xl,
  },
  orgList: {
    gap: spacing.sm,
  },
  orgRow: {
    gap: spacing.xs,
  },
  actions: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
});
