'use client';

import { useState } from 'react';
import styles from './previewSideBox.module.css';
import { Box, Typography, Divider, Button } from '@mui/material';
import { usePathname } from 'next/navigation';
import QuestionSection from './QuestionSection';
import { Question } from '@/app/(protectedRoutes)/(plantAssessment)/Questionaire/Questionaire.type';

type PreviewSideBoxProps = {
  groupedQuestions: { [key: string]: Question[] };
  currentIndex: number;
  completedQuestionIds: string[];
  setCurrentIndex: (index: number) => void;
  allQuestions: Question[];
};

const initialVisibleCount = 3;

const PreviewSideBox: React.FC<PreviewSideBoxProps> = ({
  groupedQuestions,
  currentIndex,
  completedQuestionIds,
  setCurrentIndex,
}) => {
  const pathname = usePathname();
  const [showAll, setShowAll] = useState(false);

  console.log('completedQuestionIds', completedQuestionIds);
  console.log('groupedQuestions', groupedQuestions);

  const allQuestionEntries = Object.entries(groupedQuestions);
  const flatQuestions = allQuestionEntries.flatMap(([_, questions]) => questions);
  // console.log('flatQuestions', flatQuestions);

  // const currentQuestion = flatQuestions[currentIndex];

  const sectionedQuestions: { [key: string]: Question[] } = {};
  console.log('section question ', sectionedQuestions);

  flatQuestions.forEach((q) => {
    if (!sectionedQuestions[q.department]) sectionedQuestions[q.department] = [];
    sectionedQuestions[q.department].push(q);
  });
  const sectionKeys = Object.keys(sectionedQuestions);
  console.log('sectionKeys', sectionKeys);

  const visibleSectionKeys = showAll ? sectionKeys : sectionKeys.slice(0, initialVisibleCount);

  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  const handleQuestionSelect = (questionId: string) => {
    const selectedIndex = flatQuestions.findIndex((q) => q.question_uid === questionId);
    if (selectedIndex !== -1) {
      // You can now scroll or set question in parent
      // console.log('Selected question:', flatQuestions[selectedIndex]);
      setSelectedQuestionId(questionId);
      // Optionally scroll to question or set currentIndex in parent
    }
  };

  const deduplicatedFlatQuestions = Array.from(new Map(flatQuestions.map((q) => [q.question_uid, q])).values());
  const currentDedupedQuestion = deduplicatedFlatQuestions[currentIndex];
  return (
    <Box className={styles.panelContainer}>
      <section className={styles.titleContainer}>
        <Typography variant="h6" className={styles.title}>
          Assessment Questions
        </Typography>
      </section>

      <Box className={styles.scrollContent}>
        {visibleSectionKeys.map((sectionKey) => (
          <Box key={sectionKey} className={styles.sectionBox}>
            <Box className={styles.sectionHeader}>
              <Typography className={styles.sectionTitle}>{sectionKey}</Typography>
              <Box className={styles.sectionDivider} />
            </Box>
            <QuestionSection
              questions={Array.from(
                new Map(sectionedQuestions[sectionKey].map((q) => [q.question_uid, q])).values(),
              ).map((q, idx) => ({
                ...q,
                questionNo: q.questionNo ?? idx + 1,
              }))}
              selectedQuestionId={currentDedupedQuestion?.question_uid ?? ''}
              completedIds={completedQuestionIds}
              onSelect={(questionId) => {
                const selectedIndex = deduplicatedFlatQuestions.findIndex((q) => q.question_uid === questionId);
                if (selectedIndex !== -1) {
                  setCurrentIndex(selectedIndex);
                }
              }}
            />
          </Box>
        ))}

        {!showAll && sectionKeys.length > initialVisibleCount && (
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
        {pathname.includes('/UserAssessmentPreview') && (
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
        )}
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
