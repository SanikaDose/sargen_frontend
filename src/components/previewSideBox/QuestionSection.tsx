'use client';

import { Question } from '@/app/(protectedRoutes)/(plantAssessment)/Questionaire/Questionaire.type';
import styles from './questionSection.module.css';
import { QuestionVerificationStatus } from '@/constants/enums';

type Props = {
  questions: Question[];
  selectedQuestionId?: string;
  completedIds: string[];
  onSelect: (questionId: string) => void;
  verificationStatus?: string;
};

const QuestionSection: React.FC<Props> = ({ questions, selectedQuestionId, completedIds, onSelect }) => {
  // console.log('questions', questions);
  return (
    <div className={styles.buttonGrid}>
      {questions.map((q) => {
        const isSelected = q.key === selectedQuestionId;
        const isCompleted = q.key ? completedIds.includes(q.key) : false;

        // Add verification status check
        const isVerified = q.verificationStatus === QuestionVerificationStatus.ASSESSOR_VERIFIED;
        const isNotVerified = q.verificationStatus === QuestionVerificationStatus.NOT_VERIFIED;
        const isFlagged = q.verificationStatus === QuestionVerificationStatus.ASSESSOR_FLAGGED;

        const classNames = [
          styles.questionButton,
          isCompleted ? styles.reviewed : '',
          isSelected ? styles.selected : '',
          q.verificationStatus && isVerified ? styles.verified : '',
          q.verificationStatus && isNotVerified ? styles.notVerified : '',
          q.verificationStatus && isFlagged ? styles.isFlagged : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            type="button"
            key={q.question_uid}
            className={classNames}
            onClick={() => {
              if (q.key) onSelect(q.key);
            }}
          >
            {(q.questionNo ?? 0).toString().padStart(2, '0')}
          </button>
        );
      })}
    </div>
  );
};

export default QuestionSection;
