import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { colors, typography } from '../tokens';

type TextVariant = 'title' | 'subtitle' | 'body' | 'caption' | 'label';
type TextTone = 'default' | 'muted' | 'danger' | 'primary' | 'onPrimary';

interface AppTextProps extends TextProps {
  variant?: TextVariant;
  tone?: TextTone;
  weight?: TextStyle['fontWeight'];
}

export function AppText({
  variant = 'body',
  tone = 'default',
  weight,
  style,
  ...props
}: AppTextProps) {
  return (
    <Text
      style={[
        styles.base,
        styles[variant],
        styles[`tone_${tone}`],
        weight ? { fontWeight: weight } : null,
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.text,
  },
  title: {
    fontSize: typography.title,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: typography.subtitle,
    fontWeight: '600',
  },
  body: {
    fontSize: typography.body,
    lineHeight: 22,
  },
  caption: {
    fontSize: typography.caption,
  },
  label: {
    fontSize: typography.caption,
    fontWeight: '600',
  },
  tone_default: {
    color: colors.text,
  },
  tone_muted: {
    color: colors.textMuted,
  },
  tone_danger: {
    color: colors.danger,
  },
  tone_primary: {
    color: colors.primary,
  },
  tone_onPrimary: {
    color: colors.surface,
  },
});
