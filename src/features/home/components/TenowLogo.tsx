import { StyleSheet, Text, View } from 'react-native';
import { theme } from '#shared';

interface TenowLogoProps {
  appName: string;
}

export function TenowLogo({ appName }: TenowLogoProps) {
  return (
    <View style={styles.container} testID="tenow-logo">
      <View style={styles.mark}>
        <Text style={styles.markText}>T</Text>
      </View>
      <Text style={styles.name}>{appName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  mark: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markText: {
    color: theme.colors.surface,
    fontSize: 22,
    fontWeight: '700',
  },
  name: {
    color: theme.colors.text,
    fontSize: theme.typography.title,
    fontWeight: '700',
  },
});
