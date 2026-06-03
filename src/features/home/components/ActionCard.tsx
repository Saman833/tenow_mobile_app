import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '#shared';

interface ActionCardProps {
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
  testID: string;
}

export function ActionCard({
  title,
  description,
  selected,
  onPress,
  testID,
}: ActionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, selected && styles.cardSelected]}
      testID={testID}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  cardSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryMuted,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.subtitle,
    fontWeight: '600',
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.caption,
    lineHeight: 18,
  },
});
