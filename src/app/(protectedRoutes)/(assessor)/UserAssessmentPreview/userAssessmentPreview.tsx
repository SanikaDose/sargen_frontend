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
import {
  useGetQuestionnairesListMutation,
  useSelectQuestionnairesAnswerMutation,
} from '@/app/(protectedRoutes)/(plantAssessment)/plantAssementApi';
import PreviewSideBox from '@/components/previewSideBox/PreviewSideBox';
import AnswerCard from '@/components/AnswerCard/AnswerCard';
import { PopupModal } from '@/components/PopupModal/PopupModal';

const UserAssessmentPreview = () => {
  const params = useParams();
  const router = useRouter();
  const plantId = params.plantId as string;
  // const organisationId = params.organisationId as string;
  // const department = useSelector(
  //   (state: RootState) => (state as RootState).plantAssessmentGlobal.questionnairesDeparment,
  // );
  const department = useSelector(
    (state: RootState) => (state as RootState).plantAssessmentGlobal.questionnairesDeparment,
  );
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

  if (!currentGroup) return null;

  const questionText = currentGroup[0].question;
  const completedQuestionIds = groupKeys.filter((key) => groupedQuestions[key]?.some((q) => q.isselected));

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

              {isModalOpen && (
                <PopupModal
                  label="Alert Confirmation"
                  text="Are you sure you want to mark this question as needing attention?"
                  primaryButtonText="Yes"
                  secondaryButtonText="Cancel"
                  onPrimaryClick={handlePrimaryClick}
                  onSecondaryClick={handleSecondaryClick}
                />
              )}
              <CustomButton
                variant="contained"
                icon="alert"
                type="button"
                color="warning"
                onClick={() => setIsModalOpen(true)}
              >
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
