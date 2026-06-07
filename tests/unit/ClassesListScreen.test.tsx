import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { FlatList } from 'react-native';
import { ClassRoutes } from '#app/navigation/AppRoutes';
import { ClassesListScreen } from '#features/classes';
import { ClassroomsApi } from '#features/classes/api/ClassroomsApi';

describe('ClassesListScreen', () => {
  function createClassroom(index: number) {
    return {
      id: `class-${index}`,
      name: `CS ${index}`,
      subject: 'Computer Science',
      gradeLevel: 'Grade 10',
    };
  }

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
    expect(screen.getByText('No classes yet')).toBeTruthy();
    expect(screen.getByTestId('classes-join-class')).toBeTruthy();
    expect(screen.getByTestId('classes-create-class')).toBeTruthy();
  });

  it('opens class creation and join screens from the class section', async () => {
    const navigate = jest.fn();
    const classroomsApi = {
      listMine: jest.fn().mockResolvedValue([]),
    } as unknown as ClassroomsApi;

    render(
      <ClassesListScreen
        classroomsApi={classroomsApi}
        navigation={{ navigate } as never}
        route={{ params: undefined } as never}
      />,
    );

    await waitFor(() =>
      expect(screen.getByTestId('classes-empty')).toBeTruthy(),
    );

    fireEvent.press(screen.getByTestId('classes-join-class'));
    fireEvent.press(screen.getByTestId('classes-create-class'));

    expect(navigate).toHaveBeenCalledWith(ClassRoutes.JoinClass);
    expect(navigate).toHaveBeenCalledWith(ClassRoutes.CreateClass);
  });

  it('refreshes the class list from FlatList pull-to-refresh', async () => {
    const classroomsApi = {
      listMine: jest
        .fn()
        .mockResolvedValueOnce([createClassroom(1)])
        .mockResolvedValueOnce([createClassroom(2)]),
    } as unknown as ClassroomsApi;

    render(
      <ClassesListScreen
        classroomsApi={classroomsApi}
        navigation={{ navigate: jest.fn() } as never}
        route={{ params: undefined } as never}
      />,
    );

    await waitFor(() => expect(screen.getByText('CS 1')).toBeTruthy());

    await act(async () => {
      fireEvent(screen.getByTestId('classes-flat-list'), 'refresh');
    });

    await waitFor(() => expect(screen.getByText('CS 2')).toBeTruthy());
    expect(classroomsApi.listMine).toHaveBeenCalledTimes(2);
  });

  it('shows more loaded classes when the FlatList reaches the end', async () => {
    const classroomsApi = {
      listMine: jest
        .fn()
        .mockResolvedValue(
          Array.from({ length: 11 }, (_, index) => createClassroom(index + 1)),
        ),
    } as unknown as ClassroomsApi;

    const { UNSAFE_getByType } = render(
      <ClassesListScreen
        classroomsApi={classroomsApi}
        navigation={{ navigate: jest.fn() } as never}
        route={{ params: undefined } as never}
      />,
    );

    await waitFor(() => expect(screen.getByText('CS 10')).toBeTruthy());
    expect(screen.queryByText('CS 11')).toBeNull();

    await act(async () => {
      UNSAFE_getByType(FlatList).props.onEndReached();
    });

    await waitFor(() => expect(screen.getByText('CS 11')).toBeTruthy());
  });
});
