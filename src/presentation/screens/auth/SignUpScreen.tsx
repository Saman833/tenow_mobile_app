import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AuthSessionService } from '../../../application/AuthSessionService';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { theme } from '../../theme/Theme';

interface SignUpScreenProps {
  authSessionService: AuthSessionService;
  onAuthenticated: () => void;
  onSignIn: () => void;
}

export function SignUpScreen({
  authSessionService,
  onAuthenticated,
  onSignIn,
}: SignUpScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'teacher' | 'student'>('student');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      await authSessionService.signUp({ name, email, password, role });
      onAuthenticated();
    } catch {
      setError('Unable to create account. Check the form and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenContainer testID="sign-up-screen">
      <Text style={styles.title}>Create account</Text>
      <Text style={styles.subtitle}>Start as a student or teacher.</Text>
      <View style={styles.form}>
        <TextInput
          onChangeText={setName}
          placeholder="Name"
          style={styles.input}
          testID="sign-up-name"
          value={name}
        />
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
          testID="sign-up-email"
          value={email}
        />
        <TextInput
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          testID="sign-up-password"
          value={password}
        />
        <View style={styles.roleRow}>
          <Pressable
            onPress={() => setRole('student')}
            style={[styles.roleButton, role === 'student' && styles.roleActive]}
            testID="role-student"
          >
            <Text style={styles.roleText}>Student</Text>
          </Pressable>
          <Pressable
            onPress={() => setRole('teacher')}
            style={[styles.roleButton, role === 'teacher' && styles.roleActive]}
            testID="role-teacher"
          >
            <Text style={styles.roleText}>Teacher</Text>
          </Pressable>
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Pressable
          disabled={isSubmitting}
          onPress={handleSignUp}
          style={styles.primaryButton}
          testID="sign-up-submit"
        >
          <Text style={styles.primaryButtonText}>
            {isSubmitting ? 'Creating...' : 'Create account'}
          </Text>
        </Pressable>
        <Pressable onPress={onSignIn} testID="go-to-sign-in">
          <Text style={styles.linkText}>Already have an account? Sign in</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.title,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: theme.spacing.sm,
    color: theme.colors.textMuted,
    fontSize: theme.typography.body,
    lineHeight: 22,
  },
  form: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: 12,
    borderWidth: 1,
    color: theme.colors.text,
    fontSize: theme.typography.body,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  roleRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  roleButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: theme.spacing.md,
  },
  roleActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryMuted,
  },
  roleText: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontWeight: '600',
  },
  error: {
    color: theme.colors.danger,
    fontSize: theme.typography.caption,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: theme.spacing.md,
  },
  primaryButtonText: {
    color: theme.colors.surface,
    fontSize: theme.typography.body,
    fontWeight: '700',
  },
  linkText: {
    color: theme.colors.primary,
    fontSize: theme.typography.body,
    fontWeight: '600',
    textAlign: 'center',
  },
});
