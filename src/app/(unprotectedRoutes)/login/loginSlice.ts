import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OnboardingStatus, Token } from './login.types';
import { getInitialDecodedToken } from '@/app/utils/auth';

type LoginState = {
  decodedToken: Token | null;
  onboardingStatus: string;
};

const initialState: LoginState = {
  decodedToken: getInitialDecodedToken(),
  onboardingStatus: localStorage.getItem('onboardingStatus') || '',
};

const LoginSlice = createSlice({
  name: 'tokenDecode',
  initialState,
  reducers: {
    setDecodedToken: (state, action: PayloadAction<Token>) => {
      state.decodedToken = action.payload;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('Authorization', action.payload.accessToken);
      localStorage.setItem('tenantId', action.payload.tenantId);
      localStorage.setItem('userType', action.payload.userType[0] || '');
    },
    setOnboardingStatus: (state, action: PayloadAction<OnboardingStatus>) => {
      state.onboardingStatus = action.payload;
      localStorage.setItem('onboardingStatus', action.payload);
    },
  },
});

export const { setDecodedToken, setOnboardingStatus } = LoginSlice.actions;
export default LoginSlice.reducer;
