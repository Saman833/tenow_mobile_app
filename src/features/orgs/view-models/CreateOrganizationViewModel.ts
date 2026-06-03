import { OrganizationsApi } from '../api/OrganizationsApi';
import { CreateOrganizationInput, OrganizationKind } from '../model/Organization';

export class CreateOrganizationViewModel {
  constructor(private readonly organizationsApi: OrganizationsApi) {}

  validate(name: string): string | null {
    const trimmed = name.trim();

    if (!trimmed) {
      return 'Organization name is required.';
    }

    if (trimmed.length < 2) {
      return 'Organization name must be at least 2 characters.';
    }

    return null;
  }

  async createOrganization(
    name: string,
    kind: OrganizationKind,
  ): Promise<{ id: string }> {
    const validationError = this.validate(name);

    if (validationError) {
      throw new Error(validationError);
    }

    const input: CreateOrganizationInput = {
      name: name.trim(),
      kind,
    };

    const org = await this.organizationsApi.create(input);
    await this.organizationsApi.switchOrg(org.id);

    return { id: org.id };
  }
}
