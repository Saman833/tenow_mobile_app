import { User, UserRole } from '#shared';

describe('User', () => {
  it('identifies teacher and student roles', () => {
    const teacher = new User('1', 't@tenow.app', 'Teacher', UserRole.Teacher);
    const student = new User('2', 's@tenow.app', 'Student', UserRole.Student);

    expect(teacher.isTeacher()).toBe(true);
    expect(teacher.isStudent()).toBe(false);
    expect(student.isStudent()).toBe(true);
    expect(student.isTeacher()).toBe(false);
  });
});
