export interface ResetPasswordRequest {
  sid: string;
  password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  accessToken: string;
}
