import { Pressable, PressableProps, StyleSheet, View, ViewProps } from 'react-native';
import { colors, radii, spacing } from '../tokens';

interface CardProps extends ViewProps {
  selected?: boolean;
  onPress?: PressableProps['onPress'];
  testID?: string;
}

export function Card({
  children,
  selected = false,
  onPress,
  style,
  testID,
  ...props
}: CardProps) {
  const content = (
    <View style={[styles.card, selected && styles.selected, style]} {...props}>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} testID={testID}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    padding: spacing.md,
    gap: spacing.xs,
  },
  selected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryMuted,
  },
});
