import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  AppText,
  Button,
  Card,
  colors,
  FormField,
  radii,
  ScreenContainer,
  ScreenHeader,
  spacing,
} from '#shared';
import type { AuthSessionService } from '#features/auth';
import { CreateOrganizationViewModel } from '../view-models/CreateOrganizationViewModel';
import type {
  OrganizationKind,
  OrganizationMembership,
} from '../model/Organization';

interface CreateOrganizationScreenProps {
  viewModel: CreateOrganizationViewModel;
  authSessionService: AuthSessionService;
  onCreated: () => void;
  onCancel: () => void;
}

export function CreateOrganizationScreen({
  viewModel,
  authSessionService,
  onCreated,
  onCancel,
}: CreateOrganizationScreenProps) {
  const [name, setName] = useState('');
  const [kind, setKind] = useState<OrganizationKind>('school');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [memberships, setMemberships] = useState<OrganizationMembership[]>([]);
  const [isLoadingOrganizations, setIsLoadingOrganizations] = useState(true);
  const [organizationsError, setOrganizationsError] = useState<string | null>(
    null,
  );

  const loadOrganizations = useCallback(async () => {
    setIsLoadingOrganizations(true);
    setOrganizationsError(null);

    try {
      const result = await viewModel.listOrganizations();
      setMemberships(result);
    } catch {
      setOrganizationsError('Could not load organizations.');
    } finally {
      setIsLoadingOrganizations(false);
    }
  }, [viewModel]);

  useEffect(() => {
    loadOrganizations();
  }, [loadOrganizations]);

  const handleSubmit = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      await viewModel.createOrganization(name, kind);
      await authSessionService.restoreUser();
      onCreated();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Could not create organization.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenContainer testID="create-organization-screen">
      <ScreenHeader
        title="Create organization"
        subtitle="Manage multiple classes under one school or team."
      />
      <Card style={styles.organizationsCard} testID="create-org-existing-list">
        <AppText variant="subtitle">Your organizations</AppText>
        {isLoadingOrganizations ? (
          <AppText variant="body" tone="muted">
            Loading organizations...
          </AppText>
        ) : organizationsError ? (
          <AppText variant="body" tone="danger">
            {organizationsError}
          </AppText>
        ) : memberships.length === 0 ? (
          <AppText variant="body" tone="muted">
            No organizations yet.
          </AppText>
        ) : (
          <View style={styles.organizationList}>
            {memberships.map((membership) => (
              <View
                key={membership.organization.id}
                style={styles.organizationRow}
                testID={`create-org-existing-${membership.organization.id}`}
              >
                <AppText variant="body" weight="700">
                  {membership.organization.name}
                </AppText>
                <AppText variant="caption" tone="muted">
                  {membership.orgRole}
                </AppText>
              </View>
            ))}
          </View>
        )}
      </Card>
      <View style={styles.form}>
        <FormField
          label="Organization name"
          placeholder="e.g. Lincoln High School"
          testID="create-org-name"
          value={name}
          onChangeText={setName}
        />
        <View style={styles.kindGroup}>
          <AppText variant="label">Type</AppText>
          <View style={styles.kindOptions}>
            <KindOption
              label="School"
              selected={kind === 'school'}
              testID="create-org-kind-school"
              onPress={() => setKind('school')}
            />
            <KindOption
              label="District"
              selected={kind === 'district'}
              testID="create-org-kind-district"
              onPress={() => setKind('district')}
            />
          </View>
        </View>
        {error ? (
          <AppText variant="caption" tone="danger">
            {error}
          </AppText>
        ) : null}
        <Button
          label="Create organization"
          loading={isSubmitting}
          testID="create-org-submit"
          onPress={handleSubmit}
        />
        <Button
          label="Cancel"
          variant="ghost"
          testID="create-org-cancel"
          onPress={onCancel}
        />
      </View>
    </ScreenContainer>
  );
}

interface KindOptionProps {
  label: string;
  selected: boolean;
  testID: string;
  onPress: () => void;
}

function KindOption({ label, selected, testID, onPress }: KindOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.kindOption, selected && styles.kindOptionSelected]}
      testID={testID}
    >
      <AppText variant="body" weight={selected ? '700' : '400'}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  organizationsCard: {
    marginTop: spacing.xl,
  },
  organizationList: {
    gap: spacing.sm,
  },
  organizationRow: {
    gap: spacing.xs,
  },
  form: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  kindGroup: {
    gap: spacing.sm,
  },
  kindOptions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  kindOption: {
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    flex: 1,
    padding: spacing.md,
  },
  kindOptionSelected: {
    backgroundColor: colors.primaryMuted,
    borderColor: colors.primary,
  },
});
