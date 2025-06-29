'use client';

import { Question } from '@/app/(protectedRoutes)/(plantAssessment)/Questionaire/Questionaire.type';
import {
  useGetQuestionnairesListMutation,
  useSelectQuestionnairesAnswerMutation,
} from '@/app/(protectedRoutes)/(plantAssessment)/plantAssementApi';
import AnswerCard from '@/components/AnswerCard/AnswerCard';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { PopupModal } from '@/components/PopupModal/PopupModal';
import QuestionCard from '@/components/QuestionCard/QuestionCard';
import AssessorPreviewSideBox from '@/components/previewSideBox/AssessorPreviewSideBox';
import TextArea from '@/components/textArea/TextArea';
import { pagesNames } from '@/constants/pagesHeaderNames';
import { setPageNameHeader, setShowAssessmentListSideBar } from '@/store/globalSlice';
import { Box, Paper, Typography } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './userAssessmentPreview.module.css';
import { useChangeQuestionsStatusMutation, useStartAssessmentRuleEngineMutation } from './userAssessmentPreviewApi';
import { setPlantAssessmentDepartment } from '../../(plantAssessment)/plantAssementSlice';
import { QuestionVerificationStatus } from '@/constants/enums';
import { triggerToast } from '@/app/utils/toast';

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
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [getQuestionnairesList] = useGetQuestionnairesListMutation();
  const [selectQuestionnairesAnswer] = useSelectQuestionnairesAnswerMutation();
  const [startAssessmentRuleEngine] = useStartAssessmentRuleEngineMutation();
  const [changeQuestionsStatus] = useChangeQuestionsStatusMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageNameHeader(pagesNames.assessorAssessmentQuestionnairePreview));
    dispatch(setShowAssessmentListSideBar(true));
    dispatch(setPlantAssessmentDepartment(''));
  }, [dispatch]);

  useEffect(() => {
    const fetchAllDepartmentQuestions = async () => {
      try {
        const all: Question[] = [];

        const result = await getQuestionnairesList({
          tenantId: organisationId,
          plantId: plantId || '',
          // department: dept,
        }).unwrap();
        all.push(...(result?.questionsToSend || []));

        const grouped: { [key: string]: Question[] } = {};
        const justification: { [key: string]: string } = {};
        console.log('grouped questions', grouped);

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
  }, [getQuestionnairesList, organisationId, plantId]);

  console.log('set grouped questions', groupedQuestions);
  console.log('set setAllQuestions questions', allQuestions);

  const handleAnswerClick = (answerId: string) => {
    if (!isEditMode) return;
    const questionUID = groupKeys[currentIndex];
    if (!questionUID) return;
    const updatedGroup = groupedQuestions[questionUID].map((ans) => ({
      ...ans,
      isselected: ans.id === answerId,
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

  const handleEditSaveClick = async () => {
    if (isEditMode) {
      // Save mode - submit the answer
      setIsSaving(true);
      try {
        const saveSuccess = await submitQuestionnaireAnswer();
        if (saveSuccess) {
          setIsEditMode(false);
        }
      } catch (error) {
        console.error('Failed to save answer:', error);
      } finally {
        setIsSaving(false);
      }
    } else {
      // Edit mode - enable editing
      setIsEditMode(true);
    }
  };

  const handleVerifyAndFinishClick = async () => {
    const currentQuestion = currentGroup[0];
    const selectedOption = currentGroup.find((q) => q.isselected);

    if (!currentQuestion || !selectedOption) return;

    try {
      setIsFinishing(true);

      const payload = {
        tenantId: organisationId,
        plantId: plantId,
        questionId: selectedOption.id,
        questionStatus: QuestionVerificationStatus.ASSESSOR_VERIFIED,
      };

      // 1. Verify the current question
      await changeQuestionsStatus(payload).unwrap();

      // 2. Save the answer
      const saveSuccess = await submitQuestionnaireAnswer();
      if (!saveSuccess) {
        setIsFinishing(false);
        return;
      }

      // 3. Start the rule engine
      await startAssessmentRuleEngine({
        tenantId: organisationId,
        plantId: plantId,
      }).unwrap();

      // 4. Redirect to Impact Values page
      router.push(`/AssessmentBasedImpactValues/${organisationId}/${plantId}`);
    } catch (error) {
      console.error('Failed to verify & finish assessment:', error);
    } finally {
      setIsFinishing(false);
    }
  };

  const handleVerifyClick = async () => {
    if (currentIndex < groupKeys.length - 1) {
      const currentQuestion = currentGroup[0];
      const selectedOption = currentGroup.find((q) => q.isselected);

      if (
        (currentQuestion?.questionVerificationStatus === QuestionVerificationStatus.NOT_VERIFIED ||
          currentQuestion?.questionVerificationStatus === QuestionVerificationStatus.ASSESSOR_FLAGGED) &&
        selectedOption
      ) {
        try {
          const payload = {
            tenantId: organisationId,
            plantId: plantId,
            questionId: selectedOption.id,
            questionStatus: QuestionVerificationStatus.ASSESSOR_VERIFIED,
          };

          await changeQuestionsStatus(payload).unwrap();

          // Update ONLY the selected option's status in the group
          const updatedGroup = currentGroup.map((q) => ({
            ...q,
            questionVerificationStatus:
              q.id === selectedOption.id ? QuestionVerificationStatus.ASSESSOR_VERIFIED : q.questionVerificationStatus,
          }));

          setGroupedQuestions((prev) => ({
            ...prev,
            [currentKey]: updatedGroup,
          }));

          // Update allQuestions array as well
          setAllQuestions((prev) =>
            prev.map((q) =>
              q.question_uid === currentQuestion.question_uid &&
              q.department === currentQuestion.department &&
              q.context === currentQuestion.context
                ? { ...q, questionVerificationStatus: QuestionVerificationStatus.ASSESSOR_VERIFIED }
                : q,
            ),
          );
        } catch (error) {
          console.error('Failed to verify question:', error);
          return;
        }
      }

      setCurrentIndex((prev) => prev + 1);
    }
  };

  const currentKey = groupKeys[currentIndex];
  const currentGroup = groupedQuestions[currentKey];

  if (!currentGroup) return null;

  const questionText = currentGroup[0].question;
  const completedQuestionIds = groupKeys.filter((key) => groupedQuestions[key]?.some((q) => q.isselected));
  const isLastQuestion = currentIndex === groupKeys.length - 1;

  const handlePrimaryClick = async () => {
    setIsModalOpen(false);
    const currentQuestion = currentGroup[0];
    const selectedOption = currentGroup.find((q) => q.isselected);

    if (!currentQuestion || !selectedOption) return;

    try {
      const payload = {
        tenantId: organisationId,
        plantId: plantId,
        questionId: selectedOption.id,
        questionStatus: QuestionVerificationStatus.ASSESSOR_FLAGGED,
      };

      await changeQuestionsStatus(payload).unwrap();

      // Update ONLY the selected option's status in the group
      const updatedGroup = currentGroup.map((q) => ({
        ...q,
        questionVerificationStatus: q.id === selectedOption.id ? QuestionVerificationStatus.ASSESSOR_FLAGGED : q.questionVerificationStatus,
      }));

      setGroupedQuestions((prev) => ({
        ...prev,
        [currentKey]: updatedGroup,
      }));

      // Update allQuestions array as well
      setAllQuestions((prev) =>
        prev.map((q) =>
          q.question_uid === currentQuestion.question_uid &&
          q.department === currentQuestion.department &&
          q.context === currentQuestion.context
            ? { ...q, questionVerificationStatus: QuestionVerificationStatus.ASSESSOR_FLAGGED }
            : q,
        ),
      );

      triggerToast('Question marked as needing attention', 'warning');
    } catch (error) {
      console.error('Failed to flag question as ASSESSOR_FLAGGED:', error);
      triggerToast('Failed to mark question as needing attention', 'error');
    }
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
                readOnly={!isEditMode}
              />
            </Box>
          </Box>

          <Box className={styles.rightSection}>
            <Box className={styles.aboutSection}>
              <AssessorPreviewSideBox
                groupedQuestions={groupedQuestions}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                completedQuestionIds={completedQuestionIds}
                allQuestions={allQuestions}
                questionVerificationStatus={currentGroup[0]?.questionVerificationStatus}
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
                disabled={currentIndex === 0 || isEditMode}
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
                disabled={isEditMode}
              >
                Query
              </CustomButton>

              <CustomButton
                variant="contained"
                icon={isEditMode ? 'save' : 'edit'}
                type="button"
                onClick={handleEditSaveClick}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : isEditMode ? 'Save' : 'Edit'}
              </CustomButton>

              <CustomButton
                variant="contained"
                color="primary"
                icon="success"
                type="button"
                onClick={isLastQuestion ? handleVerifyAndFinishClick : handleVerifyClick}
                disabled={isEditMode || isSaving || isFinishing}
              >
                {isFinishing ? 'Processing...' : isLastQuestion ? 'Finish' : 'Verify'}
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserAssessmentPreview;
