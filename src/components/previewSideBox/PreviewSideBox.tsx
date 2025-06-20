'use client';

import { useRef, useState, useEffect } from 'react';
import styles from './previewSideBox.module.css';
import { Box, Typography, Divider } from '@mui/material';
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

const PreviewSideBox: React.FC<PreviewSideBoxProps> = ({
  groupedQuestions,
  currentIndex,
  completedQuestionIds,
  setCurrentIndex,
  allQuestions,
}) => {
  const [prevDepartment, setPrevDepartment] = useState<string>('');
  const pathname = usePathname();

  // Create refs for each department
  const departmentRefs = useRef<{ [department: string]: HTMLDivElement | null }>({});

  // Group questions by department
  const departmentGroups: { [department: string]: { key: string; question: Question }[] } = {};

  Object.entries(groupedQuestions).forEach(([key, questions]) => {
    const q = questions[0];
    if (!q) return;

    const dept = q.department || 'Unknown';
    if (!departmentGroups[dept]) departmentGroups[dept] = [];

    departmentGroups[dept].push({ key, question: q });
  });

  const departmentNames = Object.keys(departmentGroups);

  const currentDepartment = groupedQuestions[Object.keys(groupedQuestions)[currentIndex]]?.[0]?.department || '';

  useEffect(() => {
    if (currentDepartment && prevDepartment !== currentDepartment) {
      const targetRef = departmentRefs.current[currentDepartment];
      if (targetRef && typeof targetRef.scrollIntoView === 'function') {
        targetRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setPrevDepartment(currentDepartment);
    }
  }, [currentDepartment, prevDepartment]);

  const currentKey = Object.keys(groupedQuestions)[currentIndex];
  const selectedQuestionId = currentKey;

  return (
    <Box className={styles.panelContainer}>
      <section className={styles.titleContainer}>
        <Typography variant="h4" className={styles.title}>
          Assessment Questions
        </Typography>
      </section>

      <Box className={styles.scrollContent}>
        {departmentNames.map((dept) => (
          <Box
            key={dept}
            className={styles.sectionBox}
            ref={(el: HTMLDivElement | null) => {
              departmentRefs.current[dept] = el;
            }}
          >
            <Box className={styles.sectionHeader}>
              <Typography className={styles.sectionTitle}>{dept}</Typography>
              <Box className={styles.sectionDivider} />
            </Box>

            <QuestionSection
              questions={departmentGroups[dept].map(({ key, question }, index) => ({
                ...question,
                key,
                questionNo: allQuestions.find((q) => q.groupKey === key)?.questionNo ?? index + 1,
              }))}
              selectedQuestionId={selectedQuestionId}
              completedIds={completedQuestionIds}
              onSelect={(questionId) => {
                const newIndex = Object.keys(groupedQuestions).findIndex((key) => key === questionId);
                if (newIndex !== -1) setCurrentIndex(newIndex);
              }}
            />
          </Box>
        ))}
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
          <Typography sx={{ fontSize: { xs: '0.3rem', sm: '0.7rem', md: '0.9rem' } }} className={styles.statusLabel}>
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
              Query
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
