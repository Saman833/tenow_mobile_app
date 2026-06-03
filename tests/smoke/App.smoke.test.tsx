import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { AppBootstrap } from '#app';
import App from '../../src/App';

describe('App smoke', () => {
  beforeEach(() => {
    AppBootstrap.reset();
  });

  it('renders the sign in screen before authentication', async () => {
    render(<App />);

    await waitFor(() =>
      expect(screen.getByTestId('sign-in-screen')).toBeTruthy(),
    );
  });

  it('shows auth navigation actions', async () => {
    render(<App />);

    await waitFor(() =>
      expect(screen.getByTestId('sign-in-screen')).toBeTruthy(),
    );
    expect(screen.getByText('Create account')).toBeTruthy();
  });
});
