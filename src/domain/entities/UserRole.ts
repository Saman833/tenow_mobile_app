export enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
}

export class User {
  constructor(
    readonly id: string,
    readonly email: string,
    readonly displayName: string,
    readonly role: UserRole,
  ) {}

  isTeacher(): boolean {
    return this.role === UserRole.Teacher;
  }

  isStudent(): boolean {
    return this.role === UserRole.Student;
  }
}
