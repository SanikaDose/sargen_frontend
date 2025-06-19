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

export enum OnboardingStatus {
  NOT_STARTED = 'NOT_STARTED',
  STARTED = 'STARTED',
  COMPLETED = 'COMPLETED',
}
export enum UserType {
  ADMIN = 'ADMIN',
  PLATFORMUSER = 'PLATFORMUSER',
  ASSESSOR = 'ASSESSOR',
}

export interface OnboardingStatusResponse {
  onboardingCompletionPercentage: number;
  onboardingStatus: OnboardingStatus;
}
export interface OnboardingStatusResponse {
  onboardingCompletionPercentage: number;
  onboardingStatus: OnboardingStatus;
}

export interface OnboardingStatusResponse {
  onboardingCompletionPercentage: number;
  onboardingStatus: OnboardingStatus;
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
  userType: UserType[];
};

export type RawToken = {
  exp: number;
  iat: number;
  tenantId: string;
  userId: string;
  userRole: string[];
  userType: string[];
};
