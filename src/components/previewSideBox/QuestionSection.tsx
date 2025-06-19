'use client';

import { Question } from '@/app/(protectedRoutes)/(plantAssessment)/Questionaire/Questionaire.type';
import styles from './questionSection.module.css';

type Props = {
  questions: Question[];
  selectedQuestionId?: string;
  completedIds: string[];
  onSelect: (questionId: string) => void;
};

const QuestionSection: React.FC<Props> = ({ questions, selectedQuestionId, completedIds, onSelect }) => {
  return (
    <div className={styles.buttonGrid}>
      {questions.map((q) => {
        const isSelected = q.question_uid === selectedQuestionId;
        const isCompleted = completedIds.includes(q.question_uid);

        const classNames = [
          styles.questionButton,
          isCompleted ? styles.reviewed : '',
          isSelected ? styles.selected : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button type="button" key={q.question_uid} className={classNames} onClick={() => onSelect(q.question_uid)}>
            {(q.questionNo ?? 0).toString().padStart(2, '0')}
          </button>
        );
      })}
    </div>
  );
};

export default QuestionSection;
