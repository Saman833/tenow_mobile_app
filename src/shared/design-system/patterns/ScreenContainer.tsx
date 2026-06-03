import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../tokens';

interface ScreenContainerProps extends PropsWithChildren {
  testID?: string;
}

export function ScreenContainer({ children, testID }: ScreenContainerProps) {
  return (
    <SafeAreaView style={styles.safeArea} testID={testID}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
});
