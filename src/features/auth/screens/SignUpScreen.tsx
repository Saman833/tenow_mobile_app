import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  AppText,
  Button,
  FormField,
  ScreenContainer,
  ScreenHeader,
  spacing,
  UserRole,
} from '#shared';
import { AuthSessionService } from '../services/AuthSessionService';

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
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      await authSessionService.signUp({
        name,
        email,
        password,
        role: UserRole.Student,
      });
      onAuthenticated();
    } catch {
      setError('Unable to create account. Check the form and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenContainer testID="sign-up-screen">
      <ScreenHeader
        title="Create account"
        subtitle="Create your TeNow account to continue."
      />
      <View style={styles.form}>
        <FormField
          onChangeText={setName}
          placeholder="Name"
          testID="sign-up-name"
          value={name}
        />
        <FormField
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="Email"
          testID="sign-up-email"
          value={email}
        />
        <FormField
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          testID="sign-up-password"
          value={password}
        />
        {error ? (
          <AppText variant="caption" tone="danger">
            {error}
          </AppText>
        ) : null}
        <Button
          label={isSubmitting ? 'Creating...' : 'Create account'}
          loading={isSubmitting}
          testID="sign-up-submit"
          onPress={handleSignUp}
        />
        <Button
          label="Already have an account? Sign in"
          variant="ghost"
          testID="go-to-sign-in"
          onPress={onSignIn}
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
