import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScreenContainer, theme } from '#shared';
import { AuthSessionService } from '../services/AuthSessionService';

interface SignInScreenProps {
  authSessionService: AuthSessionService;
  onAuthenticated: () => void;
  onCreateAccount: () => void;
}

export function SignInScreen({
  authSessionService,
  onAuthenticated,
  onCreateAccount,
}: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      await authSessionService.signIn({ email, password });
      onAuthenticated();
    } catch {
      setError('Unable to sign in. Check your email and password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenContainer testID="sign-in-screen">
      <Text style={styles.title}>Sign in</Text>
      <Text style={styles.subtitle}>Use your TeNow account to continue.</Text>
      <View style={styles.form}>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
          testID="sign-in-email"
          value={email}
        />
        <TextInput
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          testID="sign-in-password"
          value={password}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Pressable
          disabled={isSubmitting}
          onPress={handleSignIn}
          style={styles.primaryButton}
          testID="sign-in-submit"
        >
          <Text style={styles.primaryButtonText}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Text>
        </Pressable>
        <Pressable onPress={onCreateAccount} testID="go-to-sign-up">
          <Text style={styles.linkText}>Create account</Text>
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
