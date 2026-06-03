import { Card, AppText } from '#shared';

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
    <Card selected={selected} onPress={onPress} testID={testID}>
      <AppText variant="subtitle">{title}</AppText>
      <AppText variant="caption" tone="muted">
        {description}
      </AppText>
    </Card>
  );
}
