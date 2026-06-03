export type OrganizationKind = 'school' | 'district';

export interface Organization {
  readonly id: string;
  readonly name: string;
  readonly kind?: OrganizationKind;
}

export interface CreateOrganizationInput {
  readonly name: string;
  readonly kind: OrganizationKind;
}
