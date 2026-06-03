import { StyleSheet, View } from 'react-native';
import { spacing } from '../tokens';
import { AppText } from '../components/AppText';
import { TextInput } from '../components/TextInput';
import type { TextInputProps } from 'react-native';

interface FormFieldProps extends TextInputProps {
  label?: string;
  error?: string | null;
}

export function FormField({ label, error, ...inputProps }: FormFieldProps) {
  return (
    <View style={styles.field}>
      {label ? (
        <AppText variant="label" tone="default" style={styles.label}>
          {label}
        </AppText>
      ) : null}
      <TextInput {...inputProps} />
      {error ? (
        <AppText variant="caption" tone="danger">
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: spacing.xs,
  },
  label: {
    marginBottom: spacing.xs,
  },
});
