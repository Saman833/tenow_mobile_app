import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { ClassRoutes } from '#app/navigation/AppRoutes';
import { JoinClassScreen } from '#features/classes';
import { ClassroomsApi } from '#features/classes/api/ClassroomsApi';
import { ClipboardAccess } from '#shared';

describe('JoinClassScreen', () => {
  it('joins a class with an uppercase code and opens class detail', async () => {
    const classroomsApi = {
      joinWithCode: jest.fn().mockResolvedValue({ classId: 'class-1' }),
    } as unknown as ClassroomsApi;
    const clipboard = {
      readText: jest.fn(),
      writeText: jest.fn(),
    } as unknown as ClipboardAccess;
    const replace = jest.fn();

    render(
      <JoinClassScreen
        classroomsApi={classroomsApi}
        clipboard={clipboard}
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

  it('pastes a class code from the clipboard into the form', async () => {
    const clipboard = {
      readText: jest.fn().mockResolvedValue('math8demo'),
      writeText: jest.fn(),
    } as unknown as ClipboardAccess;
    const classroomsApi = {
      joinWithCode: jest.fn(),
    } as unknown as ClassroomsApi;

    render(
      <JoinClassScreen
        classroomsApi={classroomsApi}
        clipboard={clipboard}
        navigation={{ replace: jest.fn(), goBack: jest.fn() } as never}
        route={{ params: undefined } as never}
      />,
    );

    await act(async () => {
      fireEvent.press(screen.getByTestId('join-class-paste'));
    });

    await waitFor(() =>
      expect(screen.getByDisplayValue('MATH8DEMO')).toBeTruthy(),
    );
    expect(clipboard.readText).toHaveBeenCalledTimes(1);
  });
});
