export type AuthRole = 'teacher' | 'student' | 'school_admin' | 'parent';

export interface AuthUser {
  readonly userId?: string;
  readonly name?: string;
  readonly email?: string;
  readonly role: AuthRole | string;
  readonly activeOrgId?: string;
  readonly platformRole?: string;
}

export interface AuthSession extends AuthUser {
  readonly accessToken: string;
}

export interface SignInCredentials {
  readonly email: string;
  readonly password: string;
}

export interface SignUpCredentials extends SignInCredentials {
  readonly name: string;
  readonly role: 'teacher' | 'student';
}
