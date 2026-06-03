import { StyleSheet, View } from 'react-native';
import { Card } from '../components/Card';
import { AppText } from '../components/AppText';
import { spacing } from '../tokens';

interface ListRowProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  testID?: string;
}

export function ListRow({ title, subtitle, onPress, testID }: ListRowProps) {
  return (
    <Card onPress={onPress} testID={testID} style={styles.row}>
      <AppText variant="subtitle">{title}</AppText>
      {subtitle ? (
        <AppText variant="body" tone="muted">
          {subtitle}
        </AppText>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: spacing.sm,
  },
});
