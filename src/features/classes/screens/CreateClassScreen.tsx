import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AppText,
  Button,
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

type CreateClassScreenProps = NativeStackScreenProps<
  ClassesStackParamList,
  typeof ClassRoutes.CreateClass
> & {
  classroomsApi: ClassroomsApi;
};

export function CreateClassScreen({
  navigation,
  classroomsApi,
}: CreateClassScreenProps) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      const classroom = await classroomsApi.create({
        name,
        subject,
        gradeLevel,
      });
      navigation.replace(ClassRoutes.ClassDetail, { classId: classroom.id });
    } catch {
      setError('Could not create class.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenContainer testID="create-class-screen">
      <ScreenHeader
        title="Create a class"
        subtitle="You'll be the lead teacher. We'll generate a join code so you can invite students."
      />
      <View style={styles.form}>
        <FormField
          label="Class name"
          placeholder="e.g. Grade 8 Mathematics"
          testID="create-class-name"
          value={name}
          onChangeText={setName}
        />
        <FormField
          label="Subject"
          placeholder="Mathematics"
          testID="create-class-subject"
          value={subject}
          onChangeText={setSubject}
        />
        <FormField
          label="Grade level"
          placeholder="Grade 8"
          testID="create-class-grade-level"
          value={gradeLevel}
          onChangeText={setGradeLevel}
        />
        {error ? (
          <AppText variant="caption" tone="danger">
            {error}
          </AppText>
        ) : null}
        <Button
          label={isSubmitting ? 'Creating...' : 'Create class'}
          loading={isSubmitting}
          testID="create-class-submit"
          onPress={handleSubmit}
        />
        <Button
          label="Back to classes"
          variant="ghost"
          testID="create-class-cancel"
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
