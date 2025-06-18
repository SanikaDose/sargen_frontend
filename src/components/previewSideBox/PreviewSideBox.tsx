'use client';

import { useState } from 'react';
import styles from './previewSideBox.module.css';
import { Box, Typography, Divider, Button } from '@mui/material';
import { questionData } from './previewSideBoxData';
import QuestionSection from './QuestionSection';

const initialVisibleCount = 3;

const PreviewSideBox = () => {
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
              selected={currentQuestion}
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
          <Box
            sx={{
              width: { xs: '8px', sm: '10px', md: '20px' },
              height: { xs: '8px', sm: '10px', md: '20px' },
              borderRadius: '50%',
            }}
            className={`${styles.statusDot} ${styles.statusReviewed}`}
          />
          <Typography sx={{ fontSize: { xs: '1rem', sm: '0.7rem', md: '0.9rem' } }} className={styles.statusLabel}>
            Reviewed
          </Typography>
        </section>

        <section className={styles.innerStatusLegend}>
          <Box
            sx={{
              width: { xs: '8px', sm: '10px', md: '20px' },
              height: { xs: '8px', sm: '10px', md: '20px' },
              borderRadius: '50%',
            }}
            className={`${styles.statusDot} ${styles.statusAlert}`}
          />
          <Typography sx={{ fontSize: { xs: '0.3rem', sm: '0.7rem', md: '0.9rem' } }} className={styles.statusLabel}>
            Alert
          </Typography>
        </section>
        <section className={styles.innerStatusLegend}>
          <Box
            sx={{
              width: { xs: '8px', sm: '10px', md: '20px' },
              height: { xs: '8px', sm: '10px', md: '20px' },
              borderRadius: '50%',
            }}
            className={`${styles.statusDot} ${styles.statusNotReviewed}`}
          />
          <Typography sx={{ fontSize: { xs: '0.3rem', sm: '0.7rem', md: '0.9rem' } }} className={styles.statusLabel}>
            Not Reviewed
          </Typography>
        </section>
      </Box>
    </Box>
  );
};

export default PreviewSideBox;
