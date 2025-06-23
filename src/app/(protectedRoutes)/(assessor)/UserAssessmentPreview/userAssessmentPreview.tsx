'use client';

import { CustomButton } from '@/components/CustomButton/CustomButton';
import styles from './userAssessmentPreview.module.css';
import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import QuestionCard from '@/components/QuestionCard/QuestionCard';
import { Question } from '@/app/(protectedRoutes)/(plantAssessment)/Questionaire/Questionaire.type';
import {
  useGetQuestionnairesListMutation,
  useSelectQuestionnairesAnswerMutation,
} from '@/app/(protectedRoutes)/(plantAssessment)/plantAssementApi';
import PreviewSideBox from '@/components/previewSideBox/PreviewSideBox';
import AnswerCard from '@/components/AnswerCard/AnswerCard';
import { PopupModal } from '@/components/PopupModal/PopupModal';
import TextArea from '@/components/TextArea/TextArea';
import { useDispatch } from 'react-redux';
import { setPageNameHeader } from '@/store/globalSlice';
import { pagesNames } from '@/constants/pagesHeaderNames';
import { useStartAssessmentRuleEngineMutation } from './userAssessmentPreviewApi';

const UserAssessmentPreview = () => {
  const params = useParams();
  const router = useRouter();
  const plantId = params.plantId as string;
  const organisationId = params.organisationId as string;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [groupedQuestions, setGroupedQuestions] = useState<{ [question_uid: string]: Question[] }>({});
  const [groupKeys, setGroupKeys] = useState<string[]>([]);
  const [justificationMap, setJustificationMap] = useState<{ [question_uid: string]: string }>({});
  const [isFinishing, setIsFinishing] = useState(false);
  const [getQuestionnairesList, { isLoading }] = useGetQuestionnairesListMutation();
  const [selectQuestionnairesAnswer] = useSelectQuestionnairesAnswerMutation();
  const [startAssessmentRuleEngine] = useStartAssessmentRuleEngineMutation();
  const dispatch = useDispatch();
  dispatch(setPageNameHeader(pagesNames.assessorAssessmentQuestionnairePreview));
  console.log(organisationId);

  const departmentName = ['R&D', 'Production', 'Finance', 'IT', 'HR'];

  useEffect(() => {
    const fetchAllDepartmentQuestions = async () => {
      try {
        const all: Question[] = [];

        for (const dept of departmentName) {
          const result = await getQuestionnairesList({
            tenantId: organisationId,
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
      tenantId: organisationId,
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

  const handleFinishAssessment = async () => {
    try {
      setIsFinishing(true);

      // First save the current answer
      const saveSuccess = await submitQuestionnaireAnswer();
      if (!saveSuccess) {
        setIsFinishing(false);
        return;
      }

      // Then start the rule engine
      const ruleEnginePayload = {
        tenantId: organisationId,
        plantId: plantId,
      };

      await startAssessmentRuleEngine(ruleEnginePayload).unwrap();

      // Redirect to impact values page after successful rule engine start
      router.push(`/AssessmentBasedImpactValues/${organisationId}/${plantId}`);
    } catch (error) {
      console.error('Failed to finish assessment:', error);
      setIsFinishing(false);
    }
  };

  const currentKey = groupKeys[currentIndex];
  const currentGroup = groupedQuestions[currentKey];

  if (!currentGroup) return null;

  const questionText = currentGroup[0].question;
  const completedQuestionIds = groupKeys.filter((key) => groupedQuestions[key]?.some((q) => q.isselected));
  const isLastQuestion = currentIndex === groupKeys.length - 1;

  const handlePrimaryClick = () => {
    setIsModalOpen(false);
    console.log('Primary action clicked');
  };

  const handleSecondaryClick = () => {
    setIsModalOpen(false);
  };

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
            <Typography variant="h4" sx={{ mb: 1 }}>
              {currentGroup[0]?.department} Assessment
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
              <CustomButton variant="contained" icon="alert" type="button" color="warning" onClick={() => setIsModalOpen(true)}>
                Query
              </CustomButton>
              <CustomButton
                variant="contained"
                icon="save"
                type="button"
                onClick={
                  isLastQuestion
                    ? handleFinishAssessment
                    : async () => {
                        await submitQuestionnaireAnswer();
                      }
                }
                disabled={isFinishing}
              >
                {isFinishing ? 'Processing...' : isLoading ? 'Saving...' : isLastQuestion ? 'Finish' : 'Save'}
              </CustomButton>

              <CustomButton
                variant="contained"
                color="primary"
                icon="right"
                type="button"
                onClick={() => {
                  if (currentIndex < groupKeys.length - 1) {
                    setCurrentIndex((prev) => prev + 1);
                  }
                }}
                disabled={currentIndex === groupKeys.length - 1}
              >
                Next
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserAssessmentPreview;
