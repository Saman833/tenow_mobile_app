import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { AuthSessionService } from '../../src/application/AuthSessionService';
import { UserRole } from '../../src/domain/entities/UserRole';
import { SignUpScreen } from '../../src/presentation/screens/auth/SignUpScreen';

describe('SignUpScreen', () => {
  it('submits signup with backend default role and authenticates', async () => {
    const authSessionService = {
      signUp: jest.fn().mockResolvedValue({ accessToken: 'token', role: 'student' }),
    } as unknown as AuthSessionService;
    const onAuthenticated = jest.fn();

    render(
      <SignUpScreen
        authSessionService={authSessionService}
        onAuthenticated={onAuthenticated}
        onSignIn={jest.fn()}
      />,
    );

    fireEvent.changeText(screen.getByTestId('sign-up-name'), 'New User');
    fireEvent.changeText(screen.getByTestId('sign-up-email'), 'new@tenow.test');
    fireEvent.changeText(screen.getByTestId('sign-up-password'), 'password123');
    fireEvent.press(screen.getByTestId('sign-up-submit'));

    await waitFor(() => expect(onAuthenticated).toHaveBeenCalledTimes(1));
    expect(authSessionService.signUp).toHaveBeenCalledWith({
      name: 'New User',
      email: 'new@tenow.test',
      password: 'password123',
      role: UserRole.Student,
    });
  });

  it('does not show backend role choices in the auth UI', () => {
    render(
      <SignUpScreen
        authSessionService={{ signUp: jest.fn() } as unknown as AuthSessionService}
        onAuthenticated={jest.fn()}
        onSignIn={jest.fn()}
      />,
    );

    expect(screen.queryByText('Student')).toBeNull();
    expect(screen.queryByText('Teacher')).toBeNull();
    expect(screen.queryByText(/student or teacher/i)).toBeNull();
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
