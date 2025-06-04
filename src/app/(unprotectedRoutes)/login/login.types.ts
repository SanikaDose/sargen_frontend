export interface LoginFormInputs {
  email: string;
  password: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
}

export interface OnboardingStatusResponse {
  onboardingCompletionPercentage: number;
  onboardingStatus: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  error?: string;
}

export type FormValues = {
  firstName: string;
  lastName: string;
  organisationName: string;
  user_type: string;
  email: string;
  password: string;
  rePassword: string;
};
export type Token = {
  exp: number;
  iat: number;
  tenantId: string;
  userId: string;
  userRole: string[];
  userType: string[];
};
