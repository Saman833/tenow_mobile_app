export class BackendRoutes {
  readonly health = '/health';
  readonly ready = '/ready';
  readonly authLogin = '/auth/login';
  readonly authSignup = '/auth/signup';
  readonly authLogout = '/auth/logout';
  readonly authMe = '/auth/me';
  readonly authSwitchOrg = '/auth/switch-org';
  readonly identityMe = '/identity/me';
  readonly identityMeOrganizations = '/identity/me/organizations';
  readonly organizations = '/organizations';
  readonly classrooms = '/classrooms';
  readonly classroomJoin = '/classrooms/join';
  readonly classroomsMine = '/classrooms/mine';
  readonly classroomInvitationsMine = '/classrooms/invitations/mine';
  readonly acceptClassroomInvitation = '/classrooms/invitations/accept';

  classroomDetail(classId: string): string {
    return `/classrooms/${encodeURIComponent(classId)}`;
  }

  classroomStudents(classId: string): string {
    return `/classrooms/${encodeURIComponent(classId)}/students`;
  }

  aiConfigForClass(classId: string): string {
    return `/ai-config/class/${encodeURIComponent(classId)}`;
  }
}
