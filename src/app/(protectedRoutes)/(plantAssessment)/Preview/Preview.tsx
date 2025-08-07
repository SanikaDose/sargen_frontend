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
  // const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
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
  const [departmentQuestionOrder, setDepartmentQuestionOrder] = useState<{ [dept: string]: string[] }>({});
  const [justificationMap, setJustificationMap] = useState<{ [question_uid: string]: string }>({});
  const [getQuestionnairesList, { isLoading }] = useGetQuestionnairesListMutation();
  const [selectQuestionnairesAnswer, { isLoading: isSaving }] = useSelectQuestionnairesAnswerMutation();
  const [postAssesmentStatus] = useChangeAssessmentStatusMutation();

  // Update your fetchAllDepartmentQuestions useEffect:
  useEffect(() => {
    const fetchAllDepartmentQuestions = async () => {
      try {
        const all: Question[] = [];
        const result = await getQuestionnairesList({
          tenantId: organisationId,
          plantId: plantId || '',
        }).unwrap();
        all.push(...(result?.questionsToSend || []));

        const grouped: { [key: string]: Question[] } = {};
        const justification: { [key: string]: string } = {};
        const deptQuestionOrder: { [dept: string]: string[] } = {};

        all.forEach((q) => {
          const key = `${q.question_uid}__${q.department}__${q.context}`;

          if (!grouped[key]) {
            grouped[key] = [];
            // Track question order within department
            const dept = q.department || 'Unknown'; // Use q.department here
            if (!deptQuestionOrder[dept]) {
              deptQuestionOrder[dept] = [];
            }
            deptQuestionOrder[dept].push(key);
          }
          grouped[key].push(q);

          if (q.isselected) {
            justification[key] = q.justification || '';
          }
        });

        // Assign department-wise question numbers
        const dedupedQuestions = Object.keys(grouped).map((key) => {
          const first = grouped[key][0];
          const dept = first.department || 'Unknown'; // Use first.department here
          const deptIndex = deptQuestionOrder[dept].indexOf(key);
          return {
            ...first,
            groupKey: key,
            departmentQuestionNo: deptIndex + 1, // 1-based index
            department: dept, // Add department to the question object
          };
        });

        setGroupedQuestions(grouped);
        setGroupKeys(Object.keys(grouped));
        setJustificationMap(justification);
        setAllQuestions(dedupedQuestions);
        setDepartmentQuestionOrder(deptQuestionOrder);
        setCurrentIndex(0);
      } catch (error) {
        console.error('Failed to load questions:', error);
      }
    };

    fetchAllDepartmentQuestions();
  }, [organisationId, plantId]); // Add dependencies
  const navigateNext = () => {
    const currentQuestion = allQuestions[currentIndex];
    const currentDept = currentQuestion.department;
    const deptQuestions = departmentQuestionOrder[currentDept];
    // console.log('deptQuestions', deptQuestions);

    // Find next question in same department
    const currentInDept = deptQuestions.indexOf(groupKeys[currentIndex]);
    if (currentInDept < deptQuestions.length - 1) {
      // Next question in same department
      const nextKey = deptQuestions[currentInDept + 1];
      const nextIndex = groupKeys.indexOf(nextKey);
      setCurrentIndex(nextIndex);
    } else {
      // Find next department
      const depts = Object.keys(departmentQuestionOrder);
      console.log('depts', depts);

      const currentDeptIndex = depts.indexOf(currentDept);
      console.log('currentDeptIndex', currentDeptIndex);
      console.log('depts.length', depts.length);

      if (currentDeptIndex < depts.length - 1) {
        // First question of next department
        const nextDept = depts[currentDeptIndex + 1];

        console.log('nextDept', nextDept);

        const nextKey = departmentQuestionOrder[nextDept][0];
        const nextIndex = groupKeys.indexOf(nextKey);
        setCurrentIndex(nextIndex);
      } else if (currentDeptIndex === depts.length - 1) {
        // Last question of last department
        setFinalSubmitModel(true);
      }
    }
  };

  const navigatePrev = () => {
    if (currentIndex <= 0) return;

    const currentQuestion = allQuestions[currentIndex];
    const currentDept = currentQuestion.department;
    const deptQuestions = departmentQuestionOrder[currentDept];

    // Find previous question in same department
    const currentInDept = deptQuestions.indexOf(groupKeys[currentIndex]);
    if (currentInDept > 0) {
      // Previous question in same department
      const prevKey = deptQuestions[currentInDept - 1];
      const prevIndex = groupKeys.indexOf(prevKey);
      setCurrentIndex(prevIndex);
    } else {
      // Find previous department
      const depts = Object.keys(departmentQuestionOrder);
      const currentDeptIndex = depts.indexOf(currentDept);
      if (currentDeptIndex > 0) {
        // Last question of previous department
        const prevDept = depts[currentDeptIndex - 1];
        const prevDeptQuestions = departmentQuestionOrder[prevDept];
        const prevKey = prevDeptQuestions[prevDeptQuestions.length - 1];
        const prevIndex = groupKeys.indexOf(prevKey);
        setCurrentIndex(prevIndex);
      }
    }
  };

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
      setFinalSubmitModel(false); // Close modal immediately to prevent duplicate submissions

      const response: { error?: unknown } = await postAssesmentStatus({
        tenantId,
        plantId,
        assessment: AsseessmentStatus.COMPLETED_ASSESSMENT,
      });

      if (response.error) {
        throw new Error(typeof response.error === 'string' ? response.error : JSON.stringify(response.error));
      }

      triggerToast('Assessment submitted successfully!', 'success');
      router.push('/PlantOverview');
    } catch (err) {
      console.error('Submission failed:', err);
      triggerToast('Failed to submit assessment', 'error');
      setFinalSubmitModel(true); // Re-open modal if failed
    }
  };

  // get the current department and assign sequential numbers to questions
  const departmentGroups: { [department: string]: { key: string; question: Question; questionNo: number }[] } = {};
  const departmentCurrentNumbers: { [department: string]: number } = {};
  Object.entries(groupedQuestions).forEach(([key, questions]) => {
    const q = questions[0];
    if (!q) return;

    const dept = q.department || 'Unknown';
    if (!departmentGroups[dept]) {
      departmentGroups[dept] = [];
      departmentCurrentNumbers[dept] = 1; // Initialize counter for this department
    }

    departmentGroups[dept].push({
      key,
      question: q,
      questionNo: departmentCurrentNumbers[dept]++, // Assign and increment
    });
  });

  const currentGroupKey = groupKeys[currentIndex];
  const currentQuestion = groupedQuestions[currentGroupKey]?.[0];
  const department = currentQuestion?.department || 'Unknown';

  const departmentQuestionNumber = departmentQuestionOrder[department]?.indexOf(currentGroupKey) + 1 || 0;
  console.log('departmentQuestionOrder', departmentQuestionOrder);

  console.log('departmentGroups', departmentGroups);

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
            ) : isLoading || isSaving ? (
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
                    <QuestionCard questionNumber={departmentQuestionNumber} questionText={questionText} />
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
              <CustomButton variant="contained" color="primary" icon="left" type="button" onClick={navigatePrev}>
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

              <CustomButton variant="contained" icon="right" type="button" onClick={navigateNext} disabled={isSaving || isEditMode}>
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
          onPrimaryClick={async () => await handleFinalSubmit()}
          onSecondaryClick={() => setFinalSubmitModel(false)}
        />
      )}
    </Box>
  );
}
