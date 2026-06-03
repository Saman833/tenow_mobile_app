import { fireEvent, render, screen } from '@testing-library/react-native';
import { ClassRoutes } from '#app/navigation/AppRoutes';
import { ClassesListScreen } from '#features/classes';

describe('ClassesListScreen', () => {
  it('renders the classes entry screen', () => {
    render(
      <ClassesListScreen
        navigation={{ navigate: jest.fn() } as never}
        route={{ params: undefined } as never}
      />,
    );

    expect(screen.getByTestId('classes-list-screen')).toBeTruthy();
    expect(screen.getByText('Classes')).toBeTruthy();
  });

  it('navigates to class detail from the sample class', () => {
    const navigate = jest.fn();
    render(
      <ClassesListScreen
        navigation={{ navigate } as never}
        route={{ params: undefined } as never}
      />,
    );

    fireEvent.press(screen.getByTestId('open-class-detail-button'));

    expect(navigate).toHaveBeenCalledWith(ClassRoutes.ClassDetail, {
      classId: 'cs-101',
    });
  });
});
