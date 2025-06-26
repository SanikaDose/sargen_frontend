import { useState } from 'react';
import { Box, Typography, Link } from '@mui/material';
import type { AnswerCardProps } from './AnswerCard.types';
import styles from './style.module.css';

const MAX_PREVIEW_LENGTH = 120;

const AnswerCard = ({
  answerNumber = 1,
  answerText = 'How is product Design and WORK INSTRUCTIONS transferred to manufacturing so that they know how to produce it?',
  isSelected = false,
  onClick = () => {},
}: AnswerCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const showReadMore = answerText.length > MAX_PREVIEW_LENGTH;

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setExpanded((prev) => !prev);
  };

  return (
    <Box
      onClick={onClick}
      className={styles.outerContainer}
      sx={{
        backgroundColor: isSelected ? 'rgba(16, 85, 124, 1)' : '#fff',
        color: isSelected ? '#fff!important' : '#000',
        cursor: 'pointer',
        borderRadius: '16px',
        p: 2,
        mb: 1.5,
        transition: 'background-color 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 1,
      }}
    >
      <Typography
        variant="body1"
        className={styles.questionText}
        sx={{
          display: '-webkit-box',
          WebkitLineClamp: expanded ? 'unset' : 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textAlign: 'start',
          width: '100%',
        }}
      >
        <strong>{String(answerNumber).padStart(2, '0')}.</strong>&nbsp;&nbsp;
        {answerText}
      </Typography>
      {showReadMore && (
        <Link
          underline="hover"
          sx={{
            alignSelf: 'flex-start',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: isSelected ? '#fff' : '#10557C',
          }}
          onClick={toggleExpand}
        >
          {expanded ? 'Show less' : 'Read more'}
        </Link>
      )}
    </Box>
  );
};

export default AnswerCard;
