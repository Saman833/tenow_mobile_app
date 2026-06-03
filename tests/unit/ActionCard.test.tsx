import { fireEvent, render, screen } from '@testing-library/react-native';
import { ActionCard } from '../../src/presentation/components/home/ActionCard';

describe('ActionCard', () => {
  it('renders title and description', () => {
    render(
      <ActionCard
        title="Join a class"
        description="Use a teacher code"
        selected={false}
        onPress={jest.fn()}
        testID="action-card-join-class"
      />,
    );

    expect(screen.getByText('Join a class')).toBeTruthy();
    expect(screen.getByText('Use a teacher code')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    render(
      <ActionCard
        title="Create a class"
        description="Set up a class"
        selected={false}
        onPress={onPress}
        testID="action-card-create-class"
      />,
    );

    fireEvent.press(screen.getByTestId('action-card-create-class'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
