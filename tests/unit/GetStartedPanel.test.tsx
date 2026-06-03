import { fireEvent, render, screen } from '@testing-library/react-native';
import { GetStartedPanel } from '#features/home';

const actions = [
  {
    id: 'join-class',
    title: 'Join a class',
    description: 'Join with a code',
  },
  {
    id: 'create-class',
    title: 'Create a class',
    description: 'Start teaching',
  },
] as const;

describe('GetStartedPanel', () => {
  it('renders intro and action cards', () => {
    render(
      <GetStartedPanel
        title="Get started"
        description="Pick an option"
        actions={actions}
        selectedActionId={null}
        onSelectAction={jest.fn()}
      />,
    );

    expect(screen.getByText('Get started')).toBeTruthy();
    expect(screen.getByText('Pick an option')).toBeTruthy();
    expect(screen.getByTestId('action-card-join-class')).toBeTruthy();
    expect(screen.getByTestId('action-card-create-class')).toBeTruthy();
  });

  it('notifies parent when an action is selected', () => {
    const onSelectAction = jest.fn();
    render(
      <GetStartedPanel
        title="Get started"
        description="Pick an option"
        actions={actions}
        selectedActionId={null}
        onSelectAction={onSelectAction}
      />,
    );

    fireEvent.press(screen.getByTestId('action-card-join-class'));
    expect(onSelectAction).toHaveBeenCalledWith('join-class');
  });
});
