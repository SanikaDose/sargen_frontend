'use client';

import { CustomButton } from '@/components/CustomButton/CustomButton';
import styles from './userAssessmentPreview.module.css';
import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import QuestionCard from '@/components/QuestionCard/QuestionCard';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Question } from '@/app/(protectedRoutes)/(plantAssessment)/Questionaire/Questionaire.type';
import { useGetQuestionnairesListMutation } from '@/app/(protectedRoutes)/(plantAssessment)/plantAssementApi';
import PreviewSideBox from '@/components/previewSideBox/PreviewSideBox';
import AnswerCard from '@/components/AnswerCard/AnswerCard';

const UserAssessmentPreview = () => {
  const params = useParams();
  const router = useRouter();

  const plantId = params.plantId as string;
  const organisationId = params.organisationId as string;
  const department = useSelector((state: RootState) => (state as RootState).plantAssessmentGlobal.questionnairesDeparment);
  const tenantId = getValueLocalStorage('tenantId');
  const isLoading = false;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [groupedQuestions, setGroupedQuestions] = useState<{ [key: string]: Question[] }>({});
  const [groupKeys, setGroupKeys] = useState<string[]>([]);

  const [getQuestionnairesList] = useGetQuestionnairesListMutation();

  const fetchQuestions = useCallback(async () => {
    const result = await getQuestionnairesList({
      tenantId,
      plantId: plantId || '',
      department: department || 'R&D',
    }).unwrap();

    const questions = result?.questionsToSend || [];

    const grouped = questions.reduce((acc: { [key: string]: Question[] }, curr: Question) => {
      if (!acc[curr.question_uid]) acc[curr.question_uid] = [];
      acc[curr.question_uid].push(curr);
      return acc;
    }, {});

    setGroupedQuestions(grouped);
    setGroupKeys(Object.keys(grouped));
    setCurrentIndex(0);
  }, [getQuestionnairesList, tenantId, plantId, department]);

  useEffect(() => {
    fetchQuestions();
  }, [department, fetchQuestions]);

  const handleAnswerClick = (answerId: number) => {
    const currentKey = groupKeys[currentIndex];
    const updatedGroup = groupedQuestions[currentKey].map((ans) => ({
      ...ans,
      isselected: Number(ans.id) === answerId,
    }));

    setGroupedQuestions({
      ...groupedQuestions,
      [currentKey]: updatedGroup,
    });
  };

  const currentKey = groupKeys[currentIndex];
  const currentGroup = groupedQuestions[currentKey];

  if (!currentGroup) return null;

  const questionText = currentGroup[0].question;

  return (
    <Box component="form" sx={{ height: '100%', display: 'flex', flexDirection: 'column', width: '100%', gap: 1 }}>
      <Paper
        className={styles.formSection}
        elevation={2}
        sx={{
          mt: 2,
          borderRadius: '16px',
          backgroundColor: 'white',
          border: '1px solid rgb(216, 216, 216)',
        }}
      >
        <Box sx={{ width: '100%', height: '100%', display: 'flex' }} className={styles.bothSections}>
          <Box className={styles.formContainer}>
            <Typography variant="h6" mb="4px">
              {department.toUpperCase()}
            </Typography>

            <Box className={styles.questionAnsweresSection}>
              <Box className={styles.questionSection}>
                <QuestionCard questionNumber={currentIndex + 1} questionText={questionText} />
              </Box>
              <Box className={styles.answerSection}>
                {currentGroup.map((option, idx) => (
                  <div
                    key={option.id}
                    onClick={() => handleAnswerClick(Number(option.id))}
                    style={{ cursor: 'pointer' }}
                  >
                    <AnswerCard
                      answerNumber={idx + 1}
                      answerText={option.answer ?? ''}
                      isSelected={option.isselected}
                      onClick={() => {}}
                    />
                  </div>
                ))}
              </Box>
            </Box>
          </Box>

          <Box className={styles.rightSection}>
            <Box className={styles.aboutSection}>
              <PreviewSideBox />
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={1}
              mt={3}
              ml={5}
              mr={5}
              sx={{ background: '#F5FAFD', height: '70px', borderRadius: '16px' }}
              className={styles.buttonSection}
            >
              <CustomButton
                variant="contained"
                color="primary"
                icon="left"
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                disabled={currentIndex === 0}
              >
                Back
              </CustomButton>

              <CustomButton variant="contained" icon="alert" type="button" color="warning">
                Alert
              </CustomButton>

              <CustomButton
                variant="contained"
                icon="save"
                type="button"
                onClick={() => {
                  if (currentIndex === groupKeys.length - 1) {
                    router.push(`/AssessmentBasedImpactValues/${organisationId}/${plantId}`);
                  } else {
                    setCurrentIndex((prev) => Math.min(prev + 1, groupKeys.length - 1));
                  }
                }}
              >
                {isLoading ? 'Saving...' : currentIndex === groupKeys.length - 1 ? 'Finish' : 'Save'}
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserAssessmentPreview;
