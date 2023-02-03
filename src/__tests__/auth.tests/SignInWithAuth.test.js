import { render, fireEvent } from '@testing-library/react-native';
import { useSignIn, useSignUp } from '@clerk/clerk-expo';
// import * as AuthSession from 'expo-auth-session';

jest.mock('expo-auth-session', () => ({
  makeRedirectUri: jest.fn().mockReturnValue('redirect_uri'),
  startAsync: jest.fn().mockResolvedValue({ type: 'success', params: { rotating_token_nonce: 'nonce' } }),
}));

jest.mock('@clerk/clerk-expo', () => ({
  useSignIn: jest.fn().mockReturnValue({
    isLoaded: true,
    signIn: {
      create: jest.fn().mockResolvedValue(),
      reload: jest.fn().mockResolvedValue(),
      firstFactorVerification: {
        externalVerificationRedirectURL: 'redirect_url',
        status: 'transferable',
      },
      createdSessionId: 'session_id',
    },
    setSession: jest.fn().mockResolvedValue(),
  }),
  useSignUp: jest.fn().mockReturnValue({
    signUp: {
      create: jest.fn().mockResolvedValue(),
      reload: jest.fn().mockResolvedValue(),
      createdSessionId: 'session_id',
    },
  }),
}));

describe('SignInWithOAuth', () => {
  it('should sign in with OAuth successfully', async () => {
    const { getByText, findByText } = render(<SignInWithOAuth />);
    const signInWithDiscordButton = getByText('Sign in with Discord');
    fireEvent.press(signInWithDiscordButton);
    const successMessage = await findByText('Session created: session_id');
    expect(successMessage).toBeTruthy();
  });

  it('should sign up with OAuth successfully', async () => {
    const { useSignIn } = require('@clerk/clerk-expo');
    useSignIn.mockReturnValue({
      isLoaded: true,
      signIn: {
        create: jest.fn().mockResolvedValue(),
        reload: jest.fn().mockResolvedValue(),
        firstFactorVerification: {
          externalVerificationRedirectURL: 'redirect_url',
          status: 'transferable',
        },
        createdSessionId: null,
      },
      setSession: jest.fn().mockResolvedValue(),
    });
    
    const { getByText, findByText } = render(<

      