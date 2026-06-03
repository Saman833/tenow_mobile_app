export type OrganizationKind = 'school' | 'district';

export interface Organization {
  readonly id: string;
  readonly name: string;
  readonly slug?: string;
  readonly kind?: OrganizationKind;
}

export interface OrganizationMembership {
  readonly orgRole: 'admin' | 'member';
  readonly organization: Organization;
}

export interface CreateOrganizationInput {
  readonly name: string;
  readonly kind: OrganizationKind;
}
