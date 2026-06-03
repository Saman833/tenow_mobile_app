import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { AuthSessionService } from '../../src/application/AuthSessionService';
import { SignInScreen } from '../../src/presentation/screens/auth/SignInScreen';

describe('SignInScreen', () => {
  it('submits credentials and authenticates', async () => {
    const authSessionService = {
      signIn: jest.fn().mockResolvedValue({ accessToken: 'token', role: 'student' }),
    } as unknown as AuthSessionService;
    const onAuthenticated = jest.fn();

    render(
      <SignInScreen
        authSessionService={authSessionService}
        onAuthenticated={onAuthenticated}
        onCreateAccount={jest.fn()}
      />,
    );

    fireEvent.changeText(screen.getByTestId('sign-in-email'), 'student@tenow.test');
    fireEvent.changeText(screen.getByTestId('sign-in-password'), 'password123');
    fireEvent.press(screen.getByTestId('sign-in-submit'));

    await waitFor(() => expect(onAuthenticated).toHaveBeenCalledTimes(1));
    expect(authSessionService.signIn).toHaveBeenCalledWith({
      email: 'student@tenow.test',
      password: 'password123',
    });
  });

  it('opens sign up screen', () => {
    const onCreateAccount = jest.fn();
    render(
      <SignInScreen
        authSessionService={{ signIn: jest.fn() } as unknown as AuthSessionService}
        onAuthenticated={jest.fn()}
        onCreateAccount={onCreateAccount}
      />,
    );

    fireEvent.press(screen.getByTestId('go-to-sign-up'));

    expect(onCreateAccount).toHaveBeenCalledTimes(1);
  });
});
