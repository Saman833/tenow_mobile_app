import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AppText,
  Button,
  EmptyState,
  ScreenContainer,
  ScreenHeader,
  spacing,
  theme,
} from '#shared';
import {
  ClassRoutes,
  ClassesStackParamList,
} from '#app/navigation/AppRoutes';
import { ClassroomsApi } from '../api/ClassroomsApi';
import { Classroom } from '../model/Classroom';

type ClassDetailScreenProps = NativeStackScreenProps<
  ClassesStackParamList,
  typeof ClassRoutes.ClassDetail
> & {
  classroomsApi: ClassroomsApi;
};

export function ClassDetailScreen({
  navigation,
  route,
  classroomsApi,
}: ClassDetailScreenProps) {
  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadClassroom = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await classroomsApi.getById(route.params.classId);
      setClassroom(result);
    } catch {
      setError('Unable to load this class.');
    } finally {
      setIsLoading(false);
    }
  }, [classroomsApi, route.params.classId]);

  useEffect(() => {
    loadClassroom();
  }, [loadClassroom]);

  return (
    <ScreenContainer testID="class-detail-screen">
      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={theme.colors.primary} testID="class-detail-loading" />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <AppText variant="body" tone="danger">
            {error}
          </AppText>
          <Button label="Retry" size="sm" testID="class-detail-retry" onPress={loadClassroom} />
        </View>
      ) : classroom ? (
        <>
          <ScreenHeader
            title={classroom.name}
            subtitle={[classroom.subject, classroom.gradeLevel]
              .filter(Boolean)
              .join(' · ')}
          />
          {classroom.currentUserRole ? (
            <AppText variant="caption" tone="muted" style={styles.role}>
              Your role: {classroom.currentUserRole}
            </AppText>
          ) : null}
          <EmptyState
            title="Assignments coming soon"
            description="Create, submit, and grade assignments will appear here in a future update."
            testID="assignments-placeholder"
          />
          <Button
            label="Back to classes"
            size="sm"
            testID="back-to-classes-button"
            onPress={() => navigation.goBack()}
          />
        </>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  role: {
    marginTop: spacing.sm,
  },
});
