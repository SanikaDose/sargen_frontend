export interface Question {
  isselected: boolean;
  id: string;
  question_uid: string;
  question: string;
  answerOption: string;
  answer: string | null;
}
