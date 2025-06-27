'use client';

import { Box, Paper, Skeleton, Typography } from '@mui/material';
import styles from './Preview.module.css';
import React, { useEffect, useState } from 'react';
import { Question } from '../Questionaire/Questionaire.type';
import { useGetQuestionnairesListMutation, useSelectQuestionnairesAnswerMutation } from '../plantAssementApi';
import { useDispatch } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import QuestionCard from '@/components/QuestionCard/QuestionCard';
import AnswerCard from '@/components/AnswerCard/AnswerCard';
import TextArea from '@/components/textArea/TextArea';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import PreviewSideBox from '@/components/previewSideBox/PreviewSideBox';
import { setPageNameHeader, setShowAssessmentListSideBar } from '@/store/globalSlice';
import { pagesNames } from '@/constants/pagesHeaderNames';
import { triggerToast } from '@/app/utils/toast';
import { PopupModal } from '@/components/PopupModal/PopupModal';
import { setPlantAssessmentDepartment } from '../plantAssementSlice';
import Loader from '@/components/Loader/Loader';
import { useChangeAssessmentStatusMutation } from './PreviewApi';
import { AsseessmentStatus } from '@/constants/enums';

export default function Preview() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageNameHeader(pagesNames.plantAssesmentPreview));
    dispatch(setShowAssessmentListSideBar(true));
    dispatch(setPlantAssessmentDepartment(''));
  }, [dispatch]);
  const plantId = params.PlantId as string;

  const organisationId = params.OrganisationId as string;
  const tenantId = organisationId;

  const [isMounting, setIsMounting] = useState(false);

  //component onmount
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounting(false);
    }, 700); // Adjust duration as needed

    return () => clearTimeout(timeout);
  }, []);

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [finalSubmitModel, setFinalSubmitModel] = useState(false);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [groupedQuestions, setGroupedQuestions] = useState<{ [question_uid: string]: Question[] }>({});
  const [groupKeys, setGroupKeys] = useState<string[]>([]);
  const [justificationMap, setJustificationMap] = useState<{ [question_uid: string]: string }>({});
  const [getAllQuestionsLoading, setAllQuestionsLoading] = useState(false);
  const [getQuestionnairesList, { isLoading }] = useGetQuestionnairesListMutation();
  const [selectQuestionnairesAnswer, { isLoading: isSaving }] = useSelectQuestionnairesAnswerMutation();
  const [postAssesmentStatus] = useChangeAssessmentStatusMutation();

  const departmentName = [
    'R&D',
    'Planning',
    'Production',
    'Quality',
    'Maintenance',
    'Supply Chain - Sales',
    'Supply Chain - Purchase',
    'Finance',
    'Utilities',
    'IT',
    'Learning & Development',
    'Management',
    'HR',
  ];

  useEffect(() => {
    const fetchAllDepartmentQuestions = async () => {
      setAllQuestionsLoading(true); // Start loading

      try {
        const all: Question[] = [];

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
      } finally {
        setAllQuestionsLoading(false); // Always stop loading
      }
    };

    fetchAllDepartmentQuestions();
  }, []);

  const handleAnswerClick = (answerId: string) => {
    if (!isEditMode) return; //if edit is off then it will return
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
        answerOption: selectedOption?.answerOption ?? '',
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

  const questionText = currentGroup[0]?.question ?? '';
  const completedQuestionIds = groupKeys.filter((key) => groupedQuestions[key]?.some((q) => q.isselected));

  const handleFinalSubmit = async () => {
    try {
      await postAssesmentStatus({
        tenantId,
        plantId,
        assessment: AsseessmentStatus.COMPLETED_ASSESSMENT,
      }).unwrap();

      triggerToast('Assessment submitted successfully!', 'success');
    } catch (err) {
      console.error('API failed:', err);
      triggerToast('Failed to submit assessment', 'error');
    } finally {
      setFinalSubmitModel(false);

      // Force a full page reload to the new route
      window.location.assign('/PlantOverview');
    }
  };
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
            {isMounting ? (
              <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
                <Loader loading={true} />
              </Box>
            ) : isLoading || getAllQuestionsLoading || isSaving ? (
              <>
                <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />

                <Box className={styles.questionAnsweresSection}>
                  <Skeleton variant="rectangular" width="100%" height={60} sx={{ mb: 3, borderRadius: '8px' }} />
                  <Box className={styles.answerSection}>
                    {[1, 2, 3].map((_, i) => (
                      <Skeleton key={i} variant="rectangular" width="100%" height={48} sx={{ mb: 1.5, borderRadius: '8px' }} />
                    ))}
                  </Box>
                </Box>

                <Box className={styles.justification}>
                  <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: '8px', mt: 3 }} />
                </Box>
              </>
            ) : (
              <>
                <Typography variant="h4" sx={{ color: 'black', textAlign: 'left', width: '100%', marginBottom: 1 }}>
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
                        answerText={option.answerOption ?? ''}
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

              <CustomButton
                variant="contained"
                icon="edit"
                type="button"
                onClick={() => setIsEditMode(true)} // only turn ON
                disabled={isEditMode || isSaving} // disabled when already in edit mode or saving
              >
                Edit
              </CustomButton>

              <CustomButton
                variant="contained"
                icon="submit"
                type="button"
                color="warning"
                onClick={async () => {
                  const success = await submitQuestionnaireAnswer();
                  if (success) {
                    triggerToast('Question saved successfully!', 'success');
                    setIsEditMode(false); // ✅ Turn off edit mode after submit
                  }
                }}
                disabled={!isEditMode || isSaving} // ✅ Only enabled when editing
              >
                Submit
              </CustomButton>

              <CustomButton
                variant="contained"
                icon="right"
                type="button"
                onClick={async () => {
                  if (currentIndex < groupKeys.length - 1) {
                    setCurrentIndex((prev) => prev + 1);
                  } else if (currentIndex == groupKeys.length - 1) {
                    setFinalSubmitModel(true);
                  }
                }}
                disabled={isSaving || isEditMode}
              >
                {isSaving ? 'Saving...' : 'Next'}
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Paper>
      {finalSubmitModel && (
        <PopupModal
          label="Confirm Final Submit"
          text="Are you sure you want to submit?"
          primaryButtonText={isLoading ? 'Submitting…' : 'Confirm'}
          secondaryButtonText="Cancel"
          onPrimaryClick={() => handleFinalSubmit()}
          onSecondaryClick={() => setFinalSubmitModel(false)}
        />
      )}
    </Box>
  );
}
