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
    expect(routes.identityMe).toBe('/identity/me');
  });

  it('matches backend classroom routes', () => {
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
