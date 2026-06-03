import { StyleSheet, Text } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { theme } from '../../theme/Theme';

export function SettingsScreen() {
  return (
    <ScreenContainer testID="settings-screen">
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.description}>
        Account and workspace preferences will live here.
      </Text>
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
});
