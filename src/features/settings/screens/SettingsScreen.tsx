import { Pressable, StyleSheet, Text } from 'react-native';
import { ScreenContainer, theme } from '#shared';

interface SettingsScreenProps {
  onLogout?: () => void;
}

export function SettingsScreen({ onLogout }: SettingsScreenProps) {
  return (
    <ScreenContainer testID="settings-screen">
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.description}>
        Account and workspace preferences will live here.
      </Text>
      <Pressable
        onPress={onLogout}
        style={styles.logoutButton}
        testID="logout-button"
      >
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.title,
    fontWeight: '700',
  },
  description: {
    marginTop: theme.spacing.sm,
    color: theme.colors.textMuted,
    fontSize: theme.typography.body,
    lineHeight: 22,
  },
  logoutButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.danger,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
  },
  logoutText: {
    color: theme.colors.danger,
    fontSize: theme.typography.body,
    fontWeight: '700',
  },
});
