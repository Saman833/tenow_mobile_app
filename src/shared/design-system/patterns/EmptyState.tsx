import { StyleSheet, View } from 'react-native';
import { spacing } from '../tokens';
import { AppText } from '../components/AppText';

interface EmptyStateProps {
  title: string;
  description?: string;
  testID?: string;
}

export function EmptyState({ title, description, testID }: EmptyStateProps) {
  return (
    <View style={styles.container} testID={testID}>
      <AppText variant="subtitle">{title}</AppText>
      {description ? (
        <AppText variant="body" tone="muted" style={styles.description}>
          {description}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  description: {
    marginTop: spacing.xs,
  },
});
