import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  AppText,
  Button,
  FormField,
  ScreenContainer,
  ScreenHeader,
  spacing,
} from '#shared';
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
      <ScreenHeader
        title="Sign in"
        subtitle="Use your TeNow account to continue."
      />
      <View style={styles.form}>
        <FormField
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="Email"
          testID="sign-in-email"
          value={email}
        />
        <FormField
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          testID="sign-in-password"
          value={password}
        />
        {error ? (
          <AppText variant="caption" tone="danger">
            {error}
          </AppText>
        ) : null}
        <Button
          label={isSubmitting ? 'Signing in...' : 'Sign in'}
          loading={isSubmitting}
          testID="sign-in-submit"
          onPress={handleSignIn}
        />
        <Button
          label="Create account"
          variant="ghost"
          testID="go-to-sign-up"
          onPress={onCreateAccount}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
});
