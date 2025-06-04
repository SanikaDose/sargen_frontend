export interface RegisterFormInputs {
  user_type: 'PLATFORMUSER' | 'ASSESSOR';
  firstName?: string;
  lastName?: string;
  organisationName?: string;
  email: string;
  password: string;
  rePassword: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  accessToken: string;
}

export interface ActivateAccountRequest {
  sid: string;
}

export interface ActivateAccountResponse {
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
