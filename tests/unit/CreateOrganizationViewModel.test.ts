import { CreateOrganizationViewModel } from '#features/orgs';
import { OrganizationsApi } from '#features/orgs/api/OrganizationsApi';

describe('CreateOrganizationViewModel', () => {
  it('validates organization name', () => {
    const viewModel = new CreateOrganizationViewModel({
      create: jest.fn(),
      switchOrg: jest.fn(),
    } as unknown as OrganizationsApi);

    expect(viewModel.validate('')).toBe('Organization name is required.');
    expect(viewModel.validate('a')).toBe(
      'Organization name must be at least 2 characters.',
    );
    expect(viewModel.validate('Lincoln High')).toBeNull();
  });

  it('creates and switches organization', async () => {
    const organizationsApi = {
      create: jest.fn().mockResolvedValue({ id: 'org-1', name: 'Lincoln High' }),
      switchOrg: jest.fn().mockResolvedValue(undefined),
    } as unknown as OrganizationsApi;
    const viewModel = new CreateOrganizationViewModel(organizationsApi);

    const result = await viewModel.createOrganization('Lincoln High', 'school');

    expect(result).toEqual({ id: 'org-1' });
    expect(organizationsApi.create).toHaveBeenCalledWith({
      name: 'Lincoln High',
      kind: 'school',
    });
    expect(organizationsApi.switchOrg).toHaveBeenCalledWith('org-1');
  });

  it('lists current organizations', async () => {
    const organizationsApi = {
      create: jest.fn(),
      switchOrg: jest.fn(),
      listMine: jest.fn().mockResolvedValue([]),
    } as unknown as OrganizationsApi;
    const viewModel = new CreateOrganizationViewModel(organizationsApi);

    await expect(viewModel.listOrganizations()).resolves.toEqual([]);

    expect(organizationsApi.listMine).toHaveBeenCalledTimes(1);
  });
});
