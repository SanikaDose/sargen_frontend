import { useState } from 'react';
import styles from './questionPanel.module.css';
import { Box, Typography, Divider, Button } from '@mui/material';
import { questionData } from './questionData';
import QuestionSection from './QuestionSection';

const initialVisibleCount = 3;

const QuestionPanel = () => {
  const [currentQuestion, setCurrentQuestion] = useState<{
    section: string;
    questionNo: number;
  } | null>(null);
  const [showAll, setShowAll] = useState(false);

  const sections = [...new Set(questionData.map((q) => q.section))];
  const visibleSections = showAll ? sections : sections.slice(0, initialVisibleCount);

  return (
    <Box className={styles.panelContainer}>
      <section className={styles.titleContainer}>
        <Typography variant="h6" className={styles.title}>
          Assessment Questions
        </Typography>
      </section>

      <Box className={styles.scrollContent}>
        {visibleSections.map((section) => (
          <Box key={section} className={styles.sectionBox}>
            <Box className={styles.sectionHeader}>
              <Typography className={styles.sectionTitle}>{section}</Typography>
              <Box className={styles.sectionDivider} />
            </Box>
            <QuestionSection
              questions={questionData.filter((q) => q.section === section)}
              selected={currentQuestion ?? undefined}
              onSelect={(q) => setCurrentQuestion(q)}
            />
          </Box>
        ))}

        {!showAll && sections.length > initialVisibleCount && (
          <Button className={styles.showMoreButton} variant="outlined" onClick={() => setShowAll(true)}>
            Show More
          </Button>
        )}
      </Box>

      <Divider className={styles.divider} />

      <Box className={styles.statusLegend}>
        <section className={styles.innerStatusLegend}>
          <Box className={`${styles.statusDot} ${styles.statusReviewed}`} />
          <Typography className={styles.statusLabel}>Reviewed</Typography>
        </section>

        <section className={styles.innerStatusLegend}>
          <Box className={`${styles.statusDot} ${styles.statusNotReviewed}`} />
          <Typography className={styles.statusLabel}>Not Reviewed</Typography>
        </section>
      </Box>
    </Box>
  );
};

export default QuestionPanel;
