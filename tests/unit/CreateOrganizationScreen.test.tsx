import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { CreateOrganizationScreen } from '#features/orgs';
import { CreateOrganizationViewModel } from '#features/orgs/view-models/CreateOrganizationViewModel';
import type { AuthSessionService } from '#features/auth';

describe('CreateOrganizationScreen', () => {
  it('submits organization creation', async () => {
    const viewModel = {
      createOrganization: jest.fn().mockResolvedValue({ id: 'org-1' }),
      listOrganizations: jest.fn().mockResolvedValue([]),
    } as unknown as CreateOrganizationViewModel;
    const authSessionService = {
      restoreUser: jest.fn().mockResolvedValue({ id: 'user-1' }),
    } as unknown as AuthSessionService;
    const onCreated = jest.fn();

    render(
      <CreateOrganizationScreen
        viewModel={viewModel}
        authSessionService={authSessionService}
        onCreated={onCreated}
        onCancel={jest.fn()}
      />,
    );

    await act(async () => {
      fireEvent.changeText(screen.getByTestId('create-org-name'), 'Lincoln High');
    });
    await act(async () => {
      fireEvent.press(screen.getByTestId('create-org-submit'));
    });

    await waitFor(() => expect(onCreated).toHaveBeenCalledTimes(1));
    expect(viewModel.createOrganization).toHaveBeenCalledWith(
      'Lincoln High',
      'school',
    );
    expect(authSessionService.restoreUser).toHaveBeenCalledTimes(1);
  });

  it('shows existing organizations on the organization screen', async () => {
    const viewModel = {
      createOrganization: jest.fn(),
      listOrganizations: jest.fn().mockResolvedValue([
        {
          orgRole: 'admin',
          organization: {
            id: 'org-1',
            name: 'Lincoln High',
            kind: 'school',
          },
        },
      ]),
    } as unknown as CreateOrganizationViewModel;

    render(
      <CreateOrganizationScreen
        viewModel={viewModel}
        authSessionService={
          { restoreUser: jest.fn() } as unknown as AuthSessionService
        }
        onCreated={jest.fn()}
        onCancel={jest.fn()}
      />,
    );

    await waitFor(() =>
      expect(screen.getByTestId('create-org-existing-org-1')).toBeTruthy(),
    );
    expect(screen.getByText('Lincoln High')).toBeTruthy();
  });
});
