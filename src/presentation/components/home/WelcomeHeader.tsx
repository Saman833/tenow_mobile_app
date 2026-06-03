import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme/Theme';

interface WelcomeHeaderProps {
  headline: string;
  subtitle: string;
}

export function WelcomeHeader({ headline, subtitle }: WelcomeHeaderProps) {
  return (
    <View style={styles.container} testID="welcome-header">
      <Text style={styles.headline} testID="home-welcome-title">
        {headline}
      </Text>
      <Text style={styles.subtitle} testID="home-welcome-subtitle">
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.lg,
  },
  headline: {
    color: theme.colors.text,
    fontSize: theme.typography.title,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: theme.spacing.sm,
    color: theme.colors.textMuted,
    fontSize: theme.typography.body,
    lineHeight: 22,
  },
});
