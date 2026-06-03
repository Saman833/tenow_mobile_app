import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
} from 'react-native';
import { colors, radii, spacing, typography } from '../tokens';

export function TextInput({ style, ...props }: RNTextInputProps) {
  return <RNTextInput style={[styles.input, style]} placeholderTextColor={colors.textMuted} {...props} />;
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    color: colors.text,
    fontSize: typography.body,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
});
