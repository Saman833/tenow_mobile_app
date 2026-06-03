import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { ClassDetailScreen } from '#features/classes';
import { ClassroomsApi } from '#features/classes/api/ClassroomsApi';

describe('ClassDetailScreen', () => {
  it('renders class details from the API', async () => {
    const classroomsApi = {
      getById: jest.fn().mockResolvedValue({
        id: 'class-1',
        name: 'CS 101',
        subject: 'Computer Science',
        gradeLevel: 'Grade 10',
        currentUserRole: 'teacher',
      }),
    } as unknown as ClassroomsApi;

    render(
      <ClassDetailScreen
        classroomsApi={classroomsApi}
        navigation={{ goBack: jest.fn() } as never}
        route={{ params: { classId: 'class-1' } } as never}
      />,
    );

    await waitFor(() => expect(screen.getByText('CS 101')).toBeTruthy());
    expect(screen.getByText(/Your role: teacher/)).toBeTruthy();
    expect(screen.getByTestId('assignments-placeholder')).toBeTruthy();
  });

  it('goes back to classes', async () => {
    const goBack = jest.fn();
    const classroomsApi = {
      getById: jest.fn().mockResolvedValue({
        id: 'class-1',
        name: 'CS 101',
        subject: 'Computer Science',
        gradeLevel: 'Grade 10',
      }),
    } as unknown as ClassroomsApi;

    render(
      <ClassDetailScreen
        classroomsApi={classroomsApi}
        navigation={{ goBack } as never}
        route={{ params: { classId: 'class-1' } } as never}
      />,
    );

    await waitFor(() =>
      expect(screen.getByTestId('back-to-classes-button')).toBeTruthy(),
    );

    fireEvent.press(screen.getByTestId('back-to-classes-button'));

    expect(goBack).toHaveBeenCalledTimes(1);
  });
});
