import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AppText,
  Button,
  ClipboardAccess,
  FormField,
  ScreenContainer,
  ScreenHeader,
  spacing,
} from '#shared';
import {
  ClassRoutes,
  ClassesStackParamList,
} from '#app/navigation/AppRoutes';
import { ClassroomsApi } from '../api/ClassroomsApi';

type JoinClassScreenProps = NativeStackScreenProps<
  ClassesStackParamList,
  typeof ClassRoutes.JoinClass
> & {
  classroomsApi: ClassroomsApi;
  clipboard: ClipboardAccess;
};

export function JoinClassScreen({
  navigation,
  classroomsApi,
  clipboard,
}: JoinClassScreenProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePaste = async () => {
    const text = await clipboard.readText();

    if (text) {
      setCode(text.trim().toUpperCase().slice(0, 20));
    }
  };

  const handleSubmit = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      const enrollment = await classroomsApi.joinWithCode(code);
      navigation.replace(ClassRoutes.ClassDetail, {
        classId: enrollment.classId,
      });
    } catch {
      setError('Could not join class.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenContainer testID="join-class-screen">
      <ScreenHeader
        title="Join a class"
        subtitle="Enter the class code your teacher shared with you."
      />
      <View style={styles.form}>
        <FormField
          autoCapitalize="characters"
          label="Class code"
          maxLength={20}
          placeholder="MATH8DEMO"
          testID="join-class-code"
          value={code}
          onChangeText={(value) => setCode(value.toUpperCase())}
        />
        <Button
          label="Paste code"
          variant="secondary"
          testID="join-class-paste"
          onPress={handlePaste}
        />
        {error ? (
          <AppText variant="caption" tone="danger">
            {error}
          </AppText>
        ) : null}
        <Button
          disabled={code.trim().length < 3}
          label={isSubmitting ? 'Joining...' : 'Join class'}
          loading={isSubmitting}
          testID="join-class-submit"
          onPress={handleSubmit}
        />
        <Button
          label="Back to classes"
          variant="ghost"
          testID="join-class-cancel"
          onPress={() => navigation.goBack()}
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
