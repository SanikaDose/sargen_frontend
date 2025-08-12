import { useState } from 'react';
import { Box, Typography, Link } from '@mui/material';
import type { AnswerCardProps } from './AnswerCard.types';
import styles from './style.module.css';

const MAX_PREVIEW_LENGTH = 260;

const AnswerCard = ({
  answerNumber = 0, // 0 will represent A, 1 = B, etc.
  answerText = 'How is product Design and WORK INSTRUCTIONS transferred to manufacturing so that they know how to produce it?',
  isSelected = false,
  onClick = () => {},
}: AnswerCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const showReadMore = answerText.length > MAX_PREVIEW_LENGTH;

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

  // Convert number index to letter (A, B, C...)
  const answerLetter = String.fromCharCode(64 + answerNumber);

  return (
    <Box
      onClick={onClick}
      className={styles.outerContainer}
      sx={{
        backgroundColor: isSelected ? '#014a7d2b' : '#fff',
        boxShadow: isSelected ? '2px 2px 5px #014a7d2b' : 'none',
        color: isSelected ? '#1a1a1a' : '#000',
        cursor: 'pointer',
        borderRadius: '16px',
        p: 2,
        mb: 1.5,
        transition: 'all 0.3s ease',
        display: 'flex',
        gap: 2,
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
        <strong>{answerLetter}.</strong>&nbsp;&nbsp;
        {answerText}
      </Typography>
      {showReadMore && (
        <Link
          underline="hover"
          sx={{
            alignSelf: 'flex-end',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: '#10557C',
            display: 'flex',
            width: '9%',
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
