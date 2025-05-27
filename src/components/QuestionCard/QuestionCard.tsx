import { Box, Typography } from '@mui/material';
import styles from './questionCard.module.css';

interface QuestionCardProps {
  questionNumber: number;
  questionText: string;
}

const QuestionCard = ({
  questionNumber = 1,
  questionText = 'How is product Design and  WORK INSTRUCTIONS  transferred to manufacturing so that they know how to produce it?',
}: QuestionCardProps) => {
  return (
    <Box className={styles.outerContainer}>
      <Typography variant="body1" className={styles.questionText}>
        <strong>Q{String(questionNumber).padStart(2, '0')}.</strong>&nbsp;&nbsp;
        {questionText}
      </Typography>
    </Box>
  );
};

export default QuestionCard;
