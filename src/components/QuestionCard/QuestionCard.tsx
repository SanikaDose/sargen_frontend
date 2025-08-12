import { Box, Typography } from '@mui/material';
import styles from './style.module.css';
import { QuestionCardProps } from './QuestionCard.types';

const QuestionCard = ({
  questionText = 'How is product Design and  WORK INSTRUCTIONS  transferred to manufacturing so that they know how to produce it?',
}: QuestionCardProps) => {
  return (
    <Box className={styles.outerContainer}>
      <Typography variant="body1" className={styles.questionText}>
        <strong>Q.</strong>&nbsp;&nbsp;
        {questionText}
      </Typography>
    </Box>
  );
};

export default QuestionCard;
