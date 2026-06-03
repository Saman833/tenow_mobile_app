import { fireEvent, render, screen } from '@testing-library/react-native';
import { ClassDetailScreen } from '#features/classes';

describe('ClassDetailScreen', () => {
  it('renders the selected class id', () => {
    render(
      <ClassDetailScreen
        navigation={{ goBack: jest.fn() } as never}
        route={{ params: { classId: 'cs-101' } } as never}
      />,
    );

    expect(screen.getByTestId('class-detail-screen')).toBeTruthy();
    expect(screen.getByText(/cs-101/)).toBeTruthy();
  });

  it('goes back to classes', () => {
    const goBack = jest.fn();
    render(
      <ClassDetailScreen
        navigation={{ goBack } as never}
        route={{ params: { classId: 'cs-101' } } as never}
      />,
    );

    fireEvent.press(screen.getByTestId('back-to-classes-button'));

    expect(goBack).toHaveBeenCalledTimes(1);
  });
});
