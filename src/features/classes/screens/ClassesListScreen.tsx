import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
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

const INITIAL_CLASS_LIMIT = 10;
const CLASS_PAGE_SIZE = 10;

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
  const [visibleClassCount, setVisibleClassCount] =
    useState(INITIAL_CLASS_LIMIT);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadClasses = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await classroomsApi.listMine();
      setClasses(result);
      setVisibleClassCount(INITIAL_CLASS_LIMIT);
    } catch {
      setError('Unable to load classes. Pull to retry.');
    } finally {
      setIsLoading(false);
    }
  }, [classroomsApi]);

  useEffect(() => {
    loadClasses();
  }, [loadClasses]);

  const handleEndReached = useCallback(() => {
    setVisibleClassCount((count) =>
      Math.min(count + CLASS_PAGE_SIZE, classes.length),
    );
  }, [classes.length]);

  const visibleClasses = classes.slice(0, visibleClassCount);
  const hasMoreClasses = visibleClassCount < classes.length;
  const isInitialLoading = isLoading && classes.length === 0;

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
      {isInitialLoading ? (
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
      ) : (
        <FlatList
          data={visibleClasses}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          initialNumToRender={visibleClasses.length}
          refreshing={isLoading}
          testID="classes-flat-list"
          ListEmptyComponent={
            <EmptyState
              title="No classes yet"
              description="Join with a teacher code or create a class to invite students."
              testID="classes-empty"
            />
          }
          onEndReached={hasMoreClasses ? handleEndReached : undefined}
          onEndReachedThreshold={0.4}
          onRefresh={loadClasses}
          renderItem={({ item }) => (
            <ListRow
              title={item.name}
              subtitle={[item.subject, item.gradeLevel].filter(Boolean).join(' · ')}
              testID={`class-row-${item.id}`}
              onPress={() =>
                navigation.navigate(ClassRoutes.ClassDetail, { classId: item.id })
              }
            />
          )}
        />
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
