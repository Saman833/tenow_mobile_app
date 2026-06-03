import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import type { AuthSessionService } from '#features/auth';
import { SignInScreen } from '#features/auth/screens/SignInScreen';

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

    await act(async () => {
      fireEvent.changeText(screen.getByTestId('sign-in-email'), 'student@tenow.test');
      fireEvent.changeText(screen.getByTestId('sign-in-password'), 'password123');
    });
    await act(async () => {
      fireEvent.press(screen.getByTestId('sign-in-submit'));
    });

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
