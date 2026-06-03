import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { ClassRoutes } from '#app/navigation/AppRoutes';
import { ClassesListScreen } from '#features/classes';
import { ClassroomsApi } from '#features/classes/api/ClassroomsApi';

describe('ClassesListScreen', () => {
  it('renders classes from the API', async () => {
    const classroomsApi = {
      listMine: jest.fn().mockResolvedValue([
        {
          id: 'class-1',
          name: 'CS 101',
          subject: 'Computer Science',
          gradeLevel: 'Grade 10',
        },
      ]),
    } as unknown as ClassroomsApi;

    render(
      <ClassesListScreen
        classroomsApi={classroomsApi}
        navigation={{ navigate: jest.fn() } as never}
        route={{ params: undefined } as never}
      />,
    );

    await waitFor(() =>
      expect(screen.getByTestId('class-row-class-1')).toBeTruthy(),
    );
    expect(screen.getByText('CS 101')).toBeTruthy();
  });

  it('navigates to class detail when a class row is pressed', async () => {
    const navigate = jest.fn();
    const classroomsApi = {
      listMine: jest.fn().mockResolvedValue([
        {
          id: 'class-1',
          name: 'CS 101',
          subject: 'Computer Science',
          gradeLevel: 'Grade 10',
        },
      ]),
    } as unknown as ClassroomsApi;

    render(
      <ClassesListScreen
        classroomsApi={classroomsApi}
        navigation={{ navigate } as never}
        route={{ params: undefined } as never}
      />,
    );

    await waitFor(() =>
      expect(screen.getByTestId('class-row-class-1')).toBeTruthy(),
    );

    fireEvent.press(screen.getByTestId('class-row-class-1'));

    expect(navigate).toHaveBeenCalledWith(ClassRoutes.ClassDetail, {
      classId: 'class-1',
    });
  });

  it('shows empty state when there are no classes', async () => {
    const classroomsApi = {
      listMine: jest.fn().mockResolvedValue([]),
    } as unknown as ClassroomsApi;

    render(
      <ClassesListScreen
        classroomsApi={classroomsApi}
        navigation={{ navigate: jest.fn() } as never}
        route={{ params: undefined } as never}
      />,
    );

    await waitFor(() =>
      expect(screen.getByTestId('classes-empty')).toBeTruthy(),
    );
  });
});
