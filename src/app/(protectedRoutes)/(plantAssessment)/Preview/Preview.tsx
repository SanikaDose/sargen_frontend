'use client';

import { Box, Paper, Skeleton, Typography } from '@mui/material';
import styles from './Preview.module.css';
import React, { useEffect, useState } from 'react';
import { Question } from '../Questionaire/Questionaire.type';
import { useGetQuestionnairesListMutation, useSelectQuestionnairesAnswerMutation } from '../plantAssementApi';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import { useParams, useRouter } from 'next/navigation';
import QuestionCard from '@/components/QuestionCard/QuestionCard';
import AnswerCard from '@/components/AnswerCard/AnswerCard';
import TextArea from '@/components/textArea/TextArea';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import PreviewSideBox from '@/components/previewSideBox/PreviewSideBox';

export default function Preview() {
  const router = useRouter();
  const params = useParams();

  const plantId = params.PlantId as string;
  const tenantId = getValueLocalStorage('tenantId');

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [groupedQuestions, setGroupedQuestions] = useState<{ [question_uid: string]: Question[] }>({});
  const [groupKeys, setGroupKeys] = useState<string[]>([]);
  const [justificationMap, setJustificationMap] = useState<{ [question_uid: string]: string }>({});

  const [getQuestionnairesList, { isLoading }] = useGetQuestionnairesListMutation();
  const [selectQuestionnairesAnswer, { isLoading: isSaving }] = useSelectQuestionnairesAnswerMutation();

  const departmentName = ['R&D', 'Production', 'Finance', 'IT', 'HR'];

  useEffect(() => {
    const fetchAllDepartmentQuestions = async () => {
      try {
        let all: Question[] = [];

        for (const dept of departmentName) {
          const result = await getQuestionnairesList({
            tenantId,
            plantId: plantId || '',
            department: dept,
          }).unwrap();
          all.push(...(result?.questionsToSend || []));
        }

        const grouped: { [key: string]: Question[] } = {};
        const justification: { [key: string]: string } = {};

        all.forEach((q) => {
          // Create a unique composite key
          const key = `${q.question_uid}__${q.department}__${q.context}`;

          if (!grouped[key]) grouped[key] = [];
          grouped[key].push(q);

          if (q.isselected) {
            justification[key] = q.justification || '';
          }
        });

        const dedupedQuestions = Object.keys(grouped).map((key, index) => {
          const first = grouped[key][0];
          return {
            ...first,
            groupKey: key,
            questionNo: index + 1,
          };
        });

        setGroupedQuestions(grouped);
        setGroupKeys(Object.keys(grouped));
        setJustificationMap(justification);
        setAllQuestions(dedupedQuestions);
        setCurrentIndex(0);
      } catch (error) {
        console.error('Failed to load questions:', error);
      }
    };

    fetchAllDepartmentQuestions();
  }, []);

  const handleAnswerClick = (answerId: string) => {
    const questionUID = groupKeys[currentIndex];
    if (!questionUID) return;

    const updatedGroup = groupedQuestions[questionUID].map((ans) => ({
      ...ans,
      isselected: ans.id === answerId, // ✅ single select
    }));

    setGroupedQuestions((prev) => ({
      ...prev,
      [questionUID]: updatedGroup,
    }));
  };

  const submitQuestionnaireAnswer = async () => {
    const currentKey = groupKeys[currentIndex];
    const currentQuestionGroup = groupedQuestions[currentKey];

    if (!currentQuestionGroup) return false;

    const selectedOption = currentQuestionGroup.find((opt) => opt.isselected);
    const question_uid = currentQuestionGroup[0]?.question_uid;

    const payload = {
      tenantId,
      plantId,
      questionnariesData: {
        id: selectedOption?.id ?? '',
        question_uid,
        dim: currentQuestionGroup[0]?.dim,
        department: currentQuestionGroup[0]?.department,
        context: currentQuestionGroup[0]?.context,
        question: currentQuestionGroup[0]?.question,
        answerOption: selectedOption?.answer ?? '',
        answer: selectedOption?.answer ?? '',
        bandWeight: selectedOption?.bandWeight ?? '',
        bandName: selectedOption?.bandName ?? '',
        justification: justificationMap[currentKey] || '',
      },
    };

    try {
      await selectQuestionnairesAnswer(payload).unwrap();
      return true;
    } catch (error) {
      console.error('Failed to submit answer:', error);
      return false;
    }
  };

  const currentKey = groupKeys[currentIndex];
  const currentGroup = groupedQuestions[currentKey];
  console.log('currentGroup', currentGroup);
  if (!currentGroup) return null;

  const questionText = currentGroup[0]?.question ?? '';
  const completedQuestionIds = groupKeys.filter((key) => groupedQuestions[key]?.some((q) => q.isselected));

  return (
    <Box component="form" sx={{ height: '99%' }}>
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
          {/* Left Section */}
          <Box className={styles.formContainer}>
            {isLoading || isSaving ? (
              <>
                <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />

                <Box className={styles.questionAnsweresSection}>
                  <Skeleton variant="rectangular" width="100%" height={60} sx={{ mb: 3, borderRadius: '8px' }} />
                  <Box className={styles.answerSection}>
                    {[1, 2, 3].map((_, i) => (
                      <Skeleton
                        key={i}
                        variant="rectangular"
                        width="100%"
                        height={48}
                        sx={{ mb: 1.5, borderRadius: '8px' }}
                      />
                    ))}
                  </Box>
                </Box>

                <Box className={styles.justification}>
                  <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: '8px', mt: 3 }} />
                </Box>
              </>
            ) : (
              <>
                <Typography variant="h6" sx={{ color: 'black', textAlign: 'left', width: '100%' }}>
                  {currentGroup[0]?.department}
                </Typography>

                <Box className={styles.questionAnsweresSection}>
                  <Box className={styles.questionSection}>
                    <QuestionCard questionNumber={currentIndex + 1} questionText={questionText} />
                  </Box>

                  <Box className={styles.answerSection}>
                    {currentGroup.map((option, idx) => (
                      <AnswerCard
                        key={option.id}
                        answerNumber={idx + 1}
                        answerText={option.answer ?? ''}
                        isSelected={option.isselected}
                        onClick={() => handleAnswerClick(option.id)}
                      />
                    ))}
                  </Box>
                </Box>

                <Box className={styles.justification}>
                  <TextArea
                    value={justificationMap[currentKey] || ''}
                    onChange={(val) =>
                      setJustificationMap((prev) => ({
                        ...prev,
                        [currentKey]: val,
                      }))
                    }
                    placeholder="Enter justification"
                    readOnly={false}
                  />
                </Box>
              </>
            )}
          </Box>

          {/* Right Section */}
          <Box className={styles.rightSection}>
            <Box className={styles.aboutSection}>
              <PreviewSideBox
                groupedQuestions={groupedQuestions}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                completedQuestionIds={completedQuestionIds}
                allQuestions={allQuestions}
              />
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

              <CustomButton variant="contained" icon="edit" type="button" disabled>
                Edit
              </CustomButton>

              <CustomButton variant="contained" icon="submit" type="button" color="warning" disabled>
                Submit
              </CustomButton>

              <CustomButton
                variant="contained"
                icon="right"
                type="button"
                onClick={async () => {
                  const success = await submitQuestionnaireAnswer();
                  if (success && currentIndex < groupKeys.length - 1) {
                    setCurrentIndex((prev) => prev + 1);
                  }
                }}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Next'}
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
