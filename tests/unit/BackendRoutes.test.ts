import { BackendRoutes } from '#shared';

describe('BackendRoutes', () => {
  const routes = new BackendRoutes();

  it('matches backend health and auth routes', () => {
    expect(routes.health).toBe('/health');
    expect(routes.ready).toBe('/ready');
    expect(routes.authLogin).toBe('/auth/login');
    expect(routes.authSignup).toBe('/auth/signup');
    expect(routes.authLogout).toBe('/auth/logout');
    expect(routes.authMe).toBe('/auth/me');
    expect(routes.authSwitchOrg).toBe('/auth/switch-org');
    expect(routes.identityMe).toBe('/identity/me');
    expect(routes.identityMeOrganizations).toBe('/identity/me/organizations');
    expect(routes.organizations).toBe('/organizations');
  });

  it('matches backend classroom routes', () => {
    expect(routes.classrooms).toBe('/classrooms');
    expect(routes.classroomJoin).toBe('/classrooms/join');
    expect(routes.classroomsMine).toBe('/classrooms/mine');
    expect(routes.classroomInvitationsMine).toBe(
      '/classrooms/invitations/mine',
    );
    expect(routes.acceptClassroomInvitation).toBe(
      '/classrooms/invitations/accept',
    );
    expect(routes.classroomDetail('class 1')).toBe('/classrooms/class%201');
    expect(routes.classroomStudents('class 1')).toBe(
      '/classrooms/class%201/students',
    );
  });

  it('matches backend AI config routes', () => {
    expect(routes.aiConfigForClass('class 1')).toBe(
      '/ai-config/class/class%201',
    );
  });
});
