import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { AuthSessionService } from '../../src/application/AuthSessionService';
import { SignUpScreen } from '../../src/presentation/screens/auth/SignUpScreen';

describe('SignUpScreen', () => {
  it('submits teacher signup and authenticates', async () => {
    const authSessionService = {
      signUp: jest.fn().mockResolvedValue({ accessToken: 'token', role: 'teacher' }),
    } as unknown as AuthSessionService;
    const onAuthenticated = jest.fn();

    render(
      <SignUpScreen
        authSessionService={authSessionService}
        onAuthenticated={onAuthenticated}
        onSignIn={jest.fn()}
      />,
    );

    fireEvent.changeText(screen.getByTestId('sign-up-name'), 'Teacher');
    fireEvent.changeText(screen.getByTestId('sign-up-email'), 'teacher@tenow.test');
    fireEvent.changeText(screen.getByTestId('sign-up-password'), 'password123');
    fireEvent.press(screen.getByTestId('role-teacher'));
    fireEvent.press(screen.getByTestId('sign-up-submit'));

    await waitFor(() => expect(onAuthenticated).toHaveBeenCalledTimes(1));
    expect(authSessionService.signUp).toHaveBeenCalledWith({
      name: 'Teacher',
      email: 'teacher@tenow.test',
      password: 'password123',
      role: 'teacher',
    });
  });

  it('returns to sign in screen', () => {
    const onSignIn = jest.fn();
    render(
      <SignUpScreen
        authSessionService={{ signUp: jest.fn() } as unknown as AuthSessionService}
        onAuthenticated={jest.fn()}
        onSignIn={onSignIn}
      />,
    );

    fireEvent.press(screen.getByTestId('go-to-sign-in'));

    expect(onSignIn).toHaveBeenCalledTimes(1);
  });
});
