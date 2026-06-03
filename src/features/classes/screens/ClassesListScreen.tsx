import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ScreenContainer, theme } from '#shared';
import {
  ClassRoutes,
  ClassesStackParamList,
} from '#app/navigation/AppRoutes';

type ClassesListScreenProps = NativeStackScreenProps<
  ClassesStackParamList,
  typeof ClassRoutes.ClassList
>;

export function ClassesListScreen({ navigation }: ClassesListScreenProps) {
  return (
    <ScreenContainer testID="classes-list-screen">
      <Text style={styles.title}>Classes</Text>
      <Text style={styles.description}>
        Your classes will appear here once the API is connected.
      </Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>CS 101</Text>
        <Text style={styles.cardText}>Sample class route for the nested stack.</Text>
        <Pressable
          style={styles.button}
          testID="open-class-detail-button"
          onPress={() =>
            navigation.navigate(ClassRoutes.ClassDetail, { classId: 'cs-101' })
          }
        >
          <Text style={styles.buttonText}>Open class</Text>
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
  description: {
    marginTop: theme.spacing.sm,
    color: theme.colors.textMuted,
    fontSize: theme.typography.body,
    lineHeight: 22,
  },
  card: {
    marginTop: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: 16,
    borderWidth: 1,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.subtitle,
    fontWeight: '600',
  },
  cardText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.body,
    lineHeight: 22,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    marginTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  buttonText: {
    color: theme.colors.surface,
    fontSize: theme.typography.caption,
    fontWeight: '700',
  },
});
