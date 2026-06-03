import { StyleSheet, Text, View } from 'react-native';
import { TenowLogo } from '../../components/branding/TenowLogo';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { theme } from '../../theme/Theme';
import { HomeViewModel } from './HomeViewModel';

interface HomeScreenProps {
  viewModel: HomeViewModel;
}

export function HomeScreen({ viewModel }: HomeScreenProps) {
  return (
    <ScreenContainer testID="home-screen">
      <TenowLogo appName={viewModel.appName} />
      <Text style={styles.title} testID="home-welcome-title">
        {viewModel.welcomeTitle}
      </Text>
      <Text style={styles.tagline}>{viewModel.tagline}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>What TeNow offers</Text>
        {viewModel.featureHighlights.map((feature) => (
          <View key={feature} style={styles.featureRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: theme.spacing.lg,
    color: theme.colors.text,
    fontSize: theme.typography.subtitle,
    fontWeight: '600',
  },
  tagline: {
    marginTop: theme.spacing.sm,
    color: theme.colors.textMuted,
    fontSize: theme.typography.body,
    lineHeight: 22,
  },
  card: {
    marginTop: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.subtitle,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
  },
  bullet: {
    color: theme.colors.primary,
    fontSize: theme.typography.body,
    lineHeight: 22,
  },
  featureText: {
    flex: 1,
    color: theme.colors.textMuted,
    fontSize: theme.typography.body,
    lineHeight: 22,
  },
});
