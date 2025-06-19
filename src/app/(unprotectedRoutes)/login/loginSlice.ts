import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OnboardingStatus, Token } from './login.types';

/**
 * Redux slice for managing decoded JWT token after login.
 *
 * - Stores token details in Redux state after successful authentication.
 * - Exposes `setDecodedToken` action to update token.
 * - Helps in role-based routing and conditional rendering.
 *
 * @author Pranay Mahalle
 * @date 2025-04-09
 */

type LoginState = {
  decodedToken: Token | null;
  onboardingStatus: OnboardingStatus;
};

const initialState: LoginState = {
  decodedToken: null,
  onboardingStatus: OnboardingStatus.NOT_STARTED,
};

/**
 * Stores the decoded JWT token into Redux state after successful login.
 *
 * @param {Token} payload - Decoded JWT token containing user identity and roles.
 */

const LoginSlice = createSlice({
  name: 'tokenDecode',
  initialState,
  reducers: {
    setDecodedToken: (state, actions: PayloadAction<Token>) => {
      state.decodedToken = actions.payload;
    },
    setOnboardingStatus: (state, actions: PayloadAction<OnboardingStatus>) => {
      state.onboardingStatus = actions.payload;
    },
  },
});

export const { setDecodedToken, setOnboardingStatus } = LoginSlice.actions;
export default LoginSlice.reducer;
