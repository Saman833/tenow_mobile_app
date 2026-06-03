import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AppText,
  Button,
  EmptyState,
  ScreenContainer,
  ScreenHeader,
  ListRow,
  spacing,
  theme,
} from '#shared';
import {
  ClassRoutes,
  ClassesStackParamList,
} from '#app/navigation/AppRoutes';
import { ClassroomsApi } from '../api/ClassroomsApi';
import { Classroom } from '../model/Classroom';

type ClassesListScreenProps = NativeStackScreenProps<
  ClassesStackParamList,
  typeof ClassRoutes.ClassList
> & {
  classroomsApi: ClassroomsApi;
};

export function ClassesListScreen({
  navigation,
  classroomsApi,
}: ClassesListScreenProps) {
  const [classes, setClasses] = useState<Classroom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadClasses = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await classroomsApi.listMine();
      setClasses(result);
    } catch {
      setError('Unable to load classes. Pull to retry.');
    } finally {
      setIsLoading(false);
    }
  }, [classroomsApi]);

  useEffect(() => {
    loadClasses();
  }, [loadClasses]);

  return (
    <ScreenContainer testID="classes-list-screen">
      <ScreenHeader
        title="Classes"
        subtitle="Your enrolled and teaching classes."
      />
      <View style={styles.actions}>
        <Button
          label="Join a class"
          variant="secondary"
          testID="classes-join-class"
          onPress={() => navigation.navigate(ClassRoutes.JoinClass)}
        />
        <Button
          label="Create a class"
          testID="classes-create-class"
          onPress={() => navigation.navigate(ClassRoutes.CreateClass)}
        />
      </View>
      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={theme.colors.primary} testID="classes-loading" />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <AppText variant="body" tone="danger">
            {error}
          </AppText>
          <Button label="Retry" size="sm" testID="classes-retry" onPress={loadClasses} />
        </View>
      ) : classes.length === 0 ? (
        <EmptyState
          title="No classes yet"
          description="Join with a teacher code or create a class to invite students."
          testID="classes-empty"
        />
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {classes.map((item) => (
            <ListRow
              key={item.id}
              title={item.name}
              subtitle={[item.subject, item.gradeLevel].filter(Boolean).join(' · ')}
              testID={`class-row-${item.id}`}
              onPress={() =>
                navigation.navigate(ClassRoutes.ClassDetail, { classId: item.id })
              }
            />
          ))}
        </ScrollView>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  centered: {
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  list: {
    marginTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
});
