import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { ClassRoutes } from '#app/navigation/AppRoutes';
import { JoinClassScreen } from '#features/classes';
import { ClassroomsApi } from '#features/classes/api/ClassroomsApi';

describe('JoinClassScreen', () => {
  it('joins a class with an uppercase code and opens class detail', async () => {
    const classroomsApi = {
      joinWithCode: jest.fn().mockResolvedValue({ classId: 'class-1' }),
    } as unknown as ClassroomsApi;
    const replace = jest.fn();

    render(
      <JoinClassScreen
        classroomsApi={classroomsApi}
        navigation={{ replace, goBack: jest.fn() } as never}
        route={{ params: undefined } as never}
      />,
    );

    await act(async () => {
      fireEvent.changeText(screen.getByTestId('join-class-code'), 'math8demo');
    });
    await act(async () => {
      fireEvent.press(screen.getByTestId('join-class-submit'));
    });

    await waitFor(() =>
      expect(replace).toHaveBeenCalledWith(ClassRoutes.ClassDetail, {
        classId: 'class-1',
      }),
    );
    expect(classroomsApi.joinWithCode).toHaveBeenCalledWith('MATH8DEMO');
  });
});
