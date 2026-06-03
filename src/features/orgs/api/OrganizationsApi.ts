import { BackendRoutes, HttpClient } from '#shared';
import { CreateOrganizationInput, Organization } from '../model/Organization';

export class OrganizationsApi {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly routes: BackendRoutes,
  ) {}

  create(input: CreateOrganizationInput): Promise<Organization> {
    return this.httpClient.request<Organization>(this.routes.organizations, {
      method: 'POST',
      body: input,
    });
  }

  switchOrg(orgId: string): Promise<void> {
    return this.httpClient.request<void>(this.routes.authSwitchOrg, {
      method: 'POST',
      body: { orgId },
    });
  }
}
