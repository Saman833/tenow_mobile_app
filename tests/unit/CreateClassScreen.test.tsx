import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { ClassRoutes } from '#app/navigation/AppRoutes';
import { CreateClassScreen } from '#features/classes';
import { ClassroomsApi } from '#features/classes/api/ClassroomsApi';

describe('CreateClassScreen', () => {
  it('creates a class and opens class detail', async () => {
    const classroomsApi = {
      create: jest.fn().mockResolvedValue({
        id: 'class-1',
        name: 'Grade 8 Mathematics',
        subject: 'Mathematics',
        gradeLevel: 'Grade 8',
      }),
    } as unknown as ClassroomsApi;
    const replace = jest.fn();

    render(
      <CreateClassScreen
        classroomsApi={classroomsApi}
        navigation={{ replace, goBack: jest.fn() } as never}
        route={{ params: undefined } as never}
      />,
    );

    await act(async () => {
      fireEvent.changeText(screen.getByTestId('create-class-name'), 'Grade 8 Mathematics');
      fireEvent.changeText(screen.getByTestId('create-class-subject'), 'Mathematics');
      fireEvent.changeText(screen.getByTestId('create-class-grade-level'), 'Grade 8');
    });
    await act(async () => {
      fireEvent.press(screen.getByTestId('create-class-submit'));
    });

    await waitFor(() =>
      expect(replace).toHaveBeenCalledWith(ClassRoutes.ClassDetail, {
        classId: 'class-1',
      }),
    );
    expect(classroomsApi.create).toHaveBeenCalledWith({
      name: 'Grade 8 Mathematics',
      subject: 'Mathematics',
      gradeLevel: 'Grade 8',
    });
  });
});
