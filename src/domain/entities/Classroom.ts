export interface Classroom {
  readonly id: string;
  readonly name: string;
  readonly subject: string;
  readonly gradeLevel: string;
  readonly currentUserRole?: string;
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
