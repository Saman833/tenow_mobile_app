import { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScreenContainer, theme } from '#shared';
import { GetStartedPanel } from '../components/GetStartedPanel';
import { TenowLogo } from '../components/TenowLogo';
import { WelcomeHeader } from '../components/WelcomeHeader';
import { HomeViewModel } from '../model/HomeViewModel';

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

  const handleSelectAction = useCallback(
    (actionId: string) => {
      if (onActionPress) {
        onActionPress(actionId);
        return;
      }

      setSelectedActionId((current) => (current === actionId ? null : actionId));
    },
    [onActionPress],
  );

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
