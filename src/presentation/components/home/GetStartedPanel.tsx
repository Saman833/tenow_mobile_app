import { StyleSheet, Text, View } from 'react-native';
import { HomeActionItem } from '../../screens/home/HomeActionItem';
import { theme } from '../../theme/Theme';
import { ActionCard } from './ActionCard';

interface GetStartedPanelProps {
  title: string;
  description: string;
  actions: readonly HomeActionItem[];
  selectedActionId: string | null;
  onSelectAction: (actionId: string) => void;
}

export function GetStartedPanel({
  title,
  description,
  actions,
  selectedActionId,
  onSelectAction,
}: GetStartedPanelProps) {
  return (
    <View style={styles.container} testID="get-started-panel">
      <View style={styles.intro}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.actions}>
        {actions.map((action) => (
          <ActionCard
            key={action.id}
            title={action.title}
            description={action.description}
            selected={selectedActionId === action.id}
            onPress={() => onSelectAction(action.id)}
            testID={`action-card-${action.id}`}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  intro: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.subtitle,
    fontWeight: '600',
  },
  description: {
    marginTop: theme.spacing.sm,
    color: theme.colors.textMuted,
    fontSize: theme.typography.body,
    lineHeight: 22,
    textAlign: 'center',
  },
  actions: {
    gap: theme.spacing.sm,
  },
});
