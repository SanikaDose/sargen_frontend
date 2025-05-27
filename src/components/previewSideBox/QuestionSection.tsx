import styles from './questionSection.module.css';

interface Props {
  questions: { section: string; questionNo: number; status: string }[];
  selected?: { section: string; questionNo: number } | null;
  onSelect: (q: { section: string; questionNo: number }) => void;
}

const QuestionSection: React.FC<Props> = ({ questions, selected, onSelect }) => {
  return (
    <div className={styles.buttonGrid}>
      {questions.map((q) => {
        const isSelected = selected?.section === q.section && selected?.questionNo === q.questionNo;

        const classNames = [
          styles.questionButton,
          q.status === 'reviewed' ? styles.reviewed : '',
          isSelected ? styles.selected : '',
        ].join(' ');

        return (
          <button key={q.questionNo} className={classNames} onClick={() => onSelect(q)}>
            {q.questionNo.toString().padStart(2, '0')}
          </button>
        );
      })}
    </div>
  );
};

export default QuestionSection;
