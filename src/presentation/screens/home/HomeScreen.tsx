import { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { GetStartedPanel } from '../../components/home/GetStartedPanel';
import { WelcomeHeader } from '../../components/home/WelcomeHeader';
import { TenowLogo } from '../../components/branding/TenowLogo';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { theme } from '../../theme/Theme';
import { HomeViewModel } from './HomeViewModel';

interface HomeScreenProps {
  viewModel: HomeViewModel;
  onActionPress?: (actionId: string) => void;
}

export function HomeScreen({ viewModel, onActionPress }: HomeScreenProps) {
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);

  const selectedAction = useMemo(
    () =>
      viewModel.actions.find((action) => action.id === selectedActionId) ??
      null,
    [selectedActionId, viewModel],
  );

  const handleSelectAction = useCallback((actionId: string) => {
    setSelectedActionId((current) => (current === actionId ? null : actionId));
    onActionPress?.(actionId);
  }, [onActionPress]);

  return (
    <ScreenContainer testID="home-screen">
      <TenowLogo appName={viewModel.appName} />
      <WelcomeHeader
        headline={viewModel.welcomeHeadline}
        subtitle={viewModel.workspaceSubtitle}
      />
      <GetStartedPanel
        title={viewModel.getStartedTitle}
        description={viewModel.getStartedDescription}
        actions={viewModel.actions}
        selectedActionId={selectedActionId}
        onSelectAction={handleSelectAction}
      />
      {selectedAction ? (
        <Text style={styles.selectionHint} testID="home-selected-action-hint">
          Selected: {selectedAction.title}
        </Text>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  selectionHint: {
    marginTop: theme.spacing.md,
    color: theme.colors.primary,
    fontSize: theme.typography.caption,
    fontWeight: '600',
  },
});
