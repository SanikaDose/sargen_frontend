export type PocPayload = {
  firstName: string;
  lastName: string;
  employeeId: string;
  email: string;
  country: string;
  designation: string;
  contactNumber: string;
  jobRole?: string;
  profilePic?: string;
  onboardingCompletionPercentage?: number;
};

export interface ContactPersonFormProps {
  firstName: string;
  lastName: string;
  employeeId: string;
  email: string;
  country: string;
  designation: string;
  contactNumber: string;
  jobRole?: string;
  tenantId: string;
  editMode?: boolean;
}

export interface OnboardingStatusResponse {
  onboardingCompletionPercentage: number;
  onboardingStatus: string;
}

export interface ContactPersonApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
