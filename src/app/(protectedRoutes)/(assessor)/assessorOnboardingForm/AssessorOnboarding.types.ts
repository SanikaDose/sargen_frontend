import { RegisterOptions } from 'react-hook-form';
import { useUploadQuestionnariesMutation } from './AssessorOnboarding.Api';
export type AssessorFormType = {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  city: string;
  country: string;
  yearOfExperience: string;
  certificationYear: string;
};
export interface UploadFileMetadata {
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
  id: string;
  tableName: string;
  fileType: string;
  version: string;
  usedByPlantsId: string[];
  metadataFilePath: string;
}
export interface AssessorFormInput {
  name: keyof AssessorFormType;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  iscountry?: boolean;
  rules?: RegisterOptions<AssessorFormType, keyof AssessorFormType>;
}

export enum OnboardingStatus {
  NOT_STARTED = 'NOT_STARTED',
  STARTED = 'STARTED',
  COMPLETED = 'COMPLETED',
}
export interface OnboardingStatusResponse {
  onboardingCompletionPercentage: number;
  onboardingStatus: OnboardingStatus;
}

export interface getAssessorPayload {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  city: string;
  country: string;
  yearOfExperience: string;
  certificationYear: string;
  siriCertificate: File;
  userLogo: string;
}
export type UploadResponse = {
  status: boolean;
  message?: string;
  data?: UploadFileMetadata[];
};
export type MutationTrigger<T extends (...args: any[]) => any> = ReturnType<ReturnType<T>>;

export type UploadArgs = {
  tenantId: string;
  file: File;
};

// If you know what your backend returns, define that exact structure
export type RawUploadResponse = {
  status: boolean;
  message?: string;
  data?: UploadFileMetadata[];
};

export type uploadResponse = Promise<{ data: { status: boolean } }>;

export type UploadFunction = MutationTrigger<typeof useUploadQuestionnariesMutation>;
