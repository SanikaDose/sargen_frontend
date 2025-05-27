import { Box, Typography } from '@mui/material';
import styles from './answerCard.module.css';

interface AnswerCardProps {
  questionNumber: number;
  questionText: string;
}

const AnswerCard = ({
  questionNumber = 1,
  questionText = 'How is product Design and  WORK INSTRUCTIONS  transferred to manufacturing so that they know how to produce it?',
}: AnswerCardProps) => {
  return (
    <>
      <Box className={styles.outerContainer}>
        <Typography variant="body1" className={styles.questionText}>
          <strong>{String(questionNumber).padStart(2, '0')}.</strong>&nbsp;&nbsp;
          {questionText}
        </Typography>
      </Box>
    </>
  );
};

export default AnswerCard;
