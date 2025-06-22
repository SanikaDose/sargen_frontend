// ✅ Example: src/constants/enums.enum.ts

export enum SoftwaresUsed {
  SARGEN = 'SARGEN',
  WORKXPERT = 'WORKXPERT',
}

export enum UserType {
  ADMIN = 'ADMIN',
  PLATFORMUSER = 'PLATFORMUSER',
  ASSESSOR = 'ASSESSOR',
}

export enum SargenRoles {
  SUPER_ADMIN = 'SUPER_ADMIN',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
  ADMIN = 'ADMIN',
  ASSESSOR = 'ASSESSOR',
}

export enum OnboardingStatus {
  NOT_STARTED = 'NOT_STARTED',
  STARTED = 'STARTED',
  COMPLETED = 'COMPLETED',
}

export enum AsseessmentStatus {
  NOT_STARTED = 'NOT_STARTED',
  REQUESTED_ASSESSMENT = 'REQUESTED_ASSESSMENT',
  ASSESSOR_ASSIGNED = 'ASSESSOR_ASSIGNED',
  START_ASSESSMENT = 'START_ASSESSMENT',
  ONGOING_ASSESSMENT = 'ONGOING_ASSESSMENT',
  COMPLETED_ASSESSMENT = 'COMPLETED_ASSESSMENT', // user finished the assessment
  REVIEW_ASSESSMENT = 'REVIEW_ASSESSMENT', // Assessor is checking the answer and user cant be able to edit or enter the assessment section in app
  FINISH_ASSESSMENT = 'FINISH_ASSESSMENT', // Assessor finsihed the checking and the report is created
}
export enum EmailType {
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  ASSESSOR_ONBOARDED = 'ASSESSOR_ONBOARDED',
  LICENSE_PURCHASED = 'LICENSE_PURCHASED',
  ROADMAP_READY = 'ROADMAP_READY',
  ASSESSOR_ASSIGNED = 'ASSESSOR_ASSIGNED',
  EMAIL_VALIDATION = 'EMAIL_VALIDATION',
}

export enum EnquiryStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN-PROGRESS',
  RESOLVED = 'RESOLVED',
}
