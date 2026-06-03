import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text } from 'react-native';
import {
  ClassesStackParamList,
  ClassRoutes,
} from '../../navigation/AppRoutes';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { theme } from '../../theme/Theme';

type ClassDetailScreenProps = NativeStackScreenProps<
  ClassesStackParamList,
  typeof ClassRoutes.ClassDetail
>;

export function ClassDetailScreen({ navigation, route }: ClassDetailScreenProps) {
  return (
    <ScreenContainer testID="class-detail-screen">
      <Text style={styles.eyebrow}>Class route</Text>
      <Text style={styles.title}>CS 101</Text>
      <Text style={styles.description}>
        Nested stack detail for class id: {route.params.classId}
      </Text>
      <Pressable
        style={styles.button}
        testID="back-to-classes-button"
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back to classes</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    color: theme.colors.primary,
    fontSize: theme.typography.caption,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    marginTop: theme.spacing.sm,
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
  button: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    marginTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  buttonText: {
    color: theme.colors.surface,
    fontSize: theme.typography.caption,
    fontWeight: '700',
  },
});
