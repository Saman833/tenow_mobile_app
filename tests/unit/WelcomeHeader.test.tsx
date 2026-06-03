import { render, screen } from '@testing-library/react-native';
import { WelcomeHeader } from '#features/home';

describe('WelcomeHeader', () => {
  it('renders headline and subtitle', () => {
    render(
      <WelcomeHeader headline="Welcome back" subtitle="Workspace subtitle" />,
    );

    expect(screen.getByTestId('home-welcome-title')).toHaveTextContent(
      'Welcome back',
    );
    expect(screen.getByTestId('home-welcome-subtitle')).toHaveTextContent(
      'Workspace subtitle',
    );
  });
});
