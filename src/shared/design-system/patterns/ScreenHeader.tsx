import { StyleSheet, View } from 'react-native';
import { spacing } from '../tokens';
import { AppText } from '../components/AppText';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
}

export function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <AppText variant="title">{title}</AppText>
      {subtitle ? (
        <AppText variant="body" tone="muted" style={styles.subtitle}>
          {subtitle}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
});
