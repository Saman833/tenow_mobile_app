export interface Classroom {
  readonly id: string;
  readonly name: string;
  readonly subject: string;
  readonly gradeLevel: string;
  readonly currentUserRole?: string;
  readonly joinCode?: string;
}

export interface CreateClassroomInput {
  readonly name: string;
  readonly subject: string;
  readonly gradeLevel: string;
}

export interface ClassroomEnrollment {
  readonly classId: string;
}

export interface ClassroomInvitation {
  readonly id: string;
  readonly classId: string;
  readonly token: string;
  readonly class?: {
    readonly id: string;
    readonly name: string;
  };
}
