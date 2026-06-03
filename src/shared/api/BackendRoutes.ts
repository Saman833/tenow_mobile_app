export class BackendRoutes {
  readonly health = '/health';
  readonly ready = '/ready';
  readonly authLogin = '/auth/login';
  readonly authSignup = '/auth/signup';
  readonly authLogout = '/auth/logout';
  readonly authMe = '/auth/me';
  readonly identityMe = '/identity/me';
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
