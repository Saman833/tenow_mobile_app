import { Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';
import { colors, radii, spacing, typography } from '../tokens';
import { AppText } from './AppText';

type ButtonVariant = 'primary' | 'secondary' | 'dangerOutline' | 'ghost';
type ButtonSize = 'md' | 'sm';

interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  style?: ViewStyle;
}

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        styles[size],
        styles[variant],
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style ?? null,
      ]}
      {...props}
    >
      <AppText
        variant="body"
        weight="700"
        tone={variant === 'primary' ? 'onPrimary' : variant === 'dangerOutline' ? 'danger' : 'primary'}
        style={size === 'sm' ? styles.smLabel : undefined}
      >
        {loading ? 'Loading...' : label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: radii.md,
    justifyContent: 'center',
  },
  md: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  sm: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  smLabel: {
    fontSize: typography.caption,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
  },
  dangerOutline: {
    backgroundColor: colors.surface,
    borderColor: colors.danger,
    borderWidth: 1,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  pressed: {
    opacity: 0.9,
  },
  disabled: {
    opacity: 0.6,
  },
});
