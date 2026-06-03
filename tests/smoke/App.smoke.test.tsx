import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { AppBootstrap } from '../../src/application/AppBootstrap';
import App from '../../src/App';

describe('App smoke', () => {
  beforeEach(() => {
    AppBootstrap.reset();
  });

  it('renders the TeNow home screen', () => {
    render(<App />);

    expect(screen.getByTestId('home-screen')).toBeTruthy();
    expect(screen.getByTestId('tenow-logo')).toBeTruthy();
    expect(screen.getByTestId('home-welcome-title')).toHaveTextContent(
      'Welcome back',
    );
  });

  it('shows get started actions from the dashboard', () => {
    render(<App />);

    expect(screen.getByText('Join a class')).toBeTruthy();
    expect(screen.getByText('Create a class')).toBeTruthy();
    expect(screen.getByText('Create organization')).toBeTruthy();
  });
});
