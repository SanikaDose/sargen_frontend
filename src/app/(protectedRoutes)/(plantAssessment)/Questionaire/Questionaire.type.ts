export interface Question {
  verificationStatus: string;
  groupKey?: string;
  questionNo: number;
  key: string | undefined;
  bandName: string;
  bandWeight: string;
  context: string;
  department: string;
  dim: string;
  isselected: boolean;
  id: string;
  question_uid: string;
  question: string;
  answerOption: string;
  answer: string | null;
  justification: string | null;
  questionVerificationStatus: string;
}
