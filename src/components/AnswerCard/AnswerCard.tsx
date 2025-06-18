import { Box, Typography } from '@mui/material';
import styles from './style.module.css';
import type { AnswerCardProps } from './AnswerCard.types';

const AnswerCard = ({
  answerNumber = 1,
  answerText = 'How is product Design and  WORK INSTRUCTIONS  transferred to manufacturing so that they know how to produce it?',
  isSelected = false,
  onClick = () => {},
}: AnswerCardProps) => {
  return (
    <Box
      onClick={onClick}
      className={styles.outerContainer}
      sx={{
        backgroundColor: isSelected ? 'rgba(16, 85, 124, 1)' : 'rgba(255, 255, 255, 1)',
        color: isSelected ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)',
        cursor: 'pointer',

        p: 2,
        mb: 1,
        transition: 'background-color 0.3s ease',
      }}
    >
      <Typography variant="body1" className={styles.questionText}>
        <strong>{String(answerNumber).padStart(2, '0')}.</strong>&nbsp;&nbsp;
        {answerText}
      </Typography>
    </Box>
  );
};

export default AnswerCard;
