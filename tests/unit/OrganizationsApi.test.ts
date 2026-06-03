import { OrganizationsApi } from '#features/orgs';
import { BackendRoutes, HttpClient } from '#shared';

describe('OrganizationsApi', () => {
  it('creates an organization', async () => {
    const httpClient = {
      request: jest.fn().mockResolvedValue({ id: 'org-1', name: 'Lincoln High' }),
    } as unknown as HttpClient;
    const routes = new BackendRoutes();
    const api = new OrganizationsApi(httpClient, routes);

    await api.create({ name: 'Lincoln High', kind: 'school' });

    expect(httpClient.request).toHaveBeenCalledWith(routes.organizations, {
      method: 'POST',
      body: { name: 'Lincoln High', kind: 'school' },
    });
  });

  it('switches active organization', async () => {
    const httpClient = {
      request: jest.fn().mockResolvedValue(undefined),
    } as unknown as HttpClient;
    const routes = new BackendRoutes();
    const api = new OrganizationsApi(httpClient, routes);

    await api.switchOrg('org-1');

    expect(httpClient.request).toHaveBeenCalledWith(routes.authSwitchOrg, {
      method: 'POST',
      body: { orgId: 'org-1' },
    });
  });

  it('lists current user organizations', async () => {
    const httpClient = {
      request: jest.fn().mockResolvedValue([]),
    } as unknown as HttpClient;
    const routes = new BackendRoutes();
    const api = new OrganizationsApi(httpClient, routes);

    await expect(api.listMine()).resolves.toEqual([]);

    expect(httpClient.request).toHaveBeenCalledWith(
      routes.identityMeOrganizations,
    );
  });
});
