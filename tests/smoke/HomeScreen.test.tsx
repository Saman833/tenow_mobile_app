import { fireEvent, render, screen } from '@testing-library/react-native';
import { HomeScreen, HomeViewModel } from '#features/home';
import { TenowConfig } from '#shared';

describe('HomeScreen smoke', () => {
  const viewModel = new HomeViewModel(
    new TenowConfig({
      appName: 'TeNow',
      tagline: 'AI-native learning',
      apiBaseUrl: 'http://localhost:3000',
    }),
  );

  it('renders core dashboard view', () => {
    render(<HomeScreen viewModel={viewModel} />);

    expect(screen.getByTestId('home-screen')).toBeTruthy();
    expect(screen.getByTestId('home-welcome-title')).toHaveTextContent(
      'Welcome back',
    );
    expect(screen.getByTestId('get-started-panel')).toBeTruthy();
    expect(screen.getByText('Create organization')).toBeTruthy();
  });

  it('shows selection hint when an action card is pressed', () => {
    render(<HomeScreen viewModel={viewModel} />);

    fireEvent.press(screen.getByTestId('action-card-create-organization'));
    expect(screen.getByTestId('home-selected-action-hint')).toHaveTextContent(
      'Selected: Create organization',
    );

    fireEvent.press(screen.getByTestId('action-card-create-organization'));
    expect(screen.queryByTestId('home-selected-action-hint')).toBeNull();
  });

  it('notifies parent when an action card is pressed', () => {
    const onActionPress = jest.fn();
    render(
      <HomeScreen viewModel={viewModel} onActionPress={onActionPress} />,
    );

    fireEvent.press(screen.getByTestId('action-card-create-organization'));

    expect(onActionPress).toHaveBeenCalledWith('create-organization');
  });
});
