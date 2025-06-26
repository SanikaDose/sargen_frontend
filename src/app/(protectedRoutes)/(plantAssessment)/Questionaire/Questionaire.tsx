'use client';
import { triggerToast } from '@/app/utils/toast';
import AnswerCard from '@/components/AnswerCard/AnswerCard';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import InfoBox from '@/components/InfoBox/InfoBox';
import QuestionCard from '@/components/QuestionCard/QuestionCard';
import Stepper from '@/components/Stepper/Stepper';
import TextArea from '@/components/textArea/TextArea';
import { pagesNames } from '@/constants/pagesHeaderNames';
import { setPageNameHeader, setShowAssessmentListSideBar } from '@/store/globalSlice';
import { RootState } from '@/store/store';
import { Box, Paper, Skeleton, Typography } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetQuestionnairesListMutation, useSelectQuestionnairesAnswerMutation } from '../plantAssementApi';
import { Question } from './Questionaire.type';
import { setPlantAssessmentDepartment } from '../plantAssementSlice';
import styles from './Questionaire.module.css';
import Loader from '@/components/Loader/Loader';

const Questionaire = () => {
  const DEPARTMENT_LINKS = [
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
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageNameHeader(pagesNames.plantAssessmentQuestionnaires));
    dispatch(setShowAssessmentListSideBar(true));
  }, []);
  const plantId = params.PlantId as string;
  const organisationId = (params.OrganisationId ?? params.organisationId) as string;

  const departmentName = useSelector((state: RootState) => (state as RootState).plantAssessmentGlobal.questionnairesDeparment);

  const tenantId = organisationId;

  const [isMounting, setIsMounting] = useState(true);

  //component onmount
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounting(false);
    }, 700); // Adjust duration as needed

    return () => clearTimeout(timeout);
  }, []);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [groupedQuestions, setGroupedQuestions] = useState<{ [key: string]: Question[] }>({});
  const [groupKeys, setGroupKeys] = useState<string[]>([]);
  const [justificationMap, setJustificationMap] = useState<{ [question_uid: string]: string }>({});
  const steps = groupKeys.map((_, index) => ({
    label: `${index + 1}`,
  }));
  const [getQuestionnairesList, { isLoading }] = useGetQuestionnairesListMutation();
  const [selectQuestionnairesAnswer, { isLoading: isSaving }] = useSelectQuestionnairesAnswerMutation();
  const fetchQuestions = async (dept: string) => {
    try {
      const result = await getQuestionnairesList({
        tenantId: organisationId,
        plantId: plantId || '',
        department: dept,
      }).unwrap();

      const questions = result?.questionsToSend || [];

      const grouped = questions.reduce((acc: { [key: string]: Question[] }, curr: Question) => {
        if (!acc[curr.question_uid]) acc[curr.question_uid] = [];
        acc[curr.question_uid].push(curr);
        return acc;
      }, {});

      const justificationState: { [key: string]: string } = {};
      questions.forEach((q: Question) => {
        if (q.isselected) {
          justificationState[q.question_uid] = q.justification || '';
        }
      });

      setGroupedQuestions(grouped);
      setGroupKeys(Object.keys(grouped));
      setJustificationMap(justificationState);
      setCurrentIndex(0); // Reset question index for new department
    } catch (error) {
      console.error(`Error fetching questions for department ${dept}:`, error);
    }
  };

  useEffect(() => {
    if (departmentName && departmentName.trim().length > 0) {
      fetchQuestions(departmentName);
    }
  }, [departmentName]);

  const handleAnswerClick = (answerId: string) => {
    const currentKey = groupKeys[currentIndex];

    const updatedGroup = groupedQuestions[currentKey].map((ans) => ({
      ...ans,
      isselected: ans.id === answerId, // ✅ Only selected one is true
    }));

    setGroupedQuestions((prev) => ({
      ...prev,
      [currentKey]: updatedGroup,
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
        justification: justificationMap[question_uid] || '',
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

  // Calculate completed steps
  const completedSteps = groupKeys.reduce<number[]>((acc, key, index) => {
    const group = groupedQuestions[key];
    if (group?.some((q) => q.isselected)) acc.push(index);
    return acc;
  }, []);

  if (!currentGroup) return null;

  const questionText = currentGroup[0].question;

  return (
    <Box component="form" sx={{ height: '99%' }}>
      <Box className={styles.stepperContainer}>
        <Stepper steps={steps} completedSteps={completedSteps} activeStep={currentIndex} />
      </Box>

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
          {/* Left section */}

          {groupKeys.length > 0 ? (
            <Box className={styles.formContainer}>
              {isLoading || isSaving ? (
                <Skeleton variant="text" width="40%" height={40} />
              ) : (
                <Typography variant="h4" sx={{ marginBottom: 1 }}>
                  {currentGroup && currentGroup[0]?.department}
                </Typography>
              )}

              {isLoading || isSaving ? (
                <Box className={styles.questionAnsweresSection}>
                  <Skeleton variant="rectangular" height={60} width="100%" sx={{ mb: 2, borderRadius: '8px' }} />
                  <Box className={styles.answerSection}>
                    {[1, 2, 3].map((_, i) => (
                      <Skeleton key={i} variant="rectangular" height={48} width="100%" sx={{ mb: 1, borderRadius: '8px' }} />
                    ))}
                  </Box>
                </Box>
              ) : (
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
              )}

              <Box className={styles.justification}>
                {isMounting ? (
                  <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
                    <Loader loading={true} />
                  </Box>
                ) : isLoading || isSaving ? (
                  <Skeleton variant="rectangular" height={120} width="100%" sx={{ borderRadius: '8px' }} />
                ) : (
                  <TextArea
                    value={justificationMap[currentGroup[0]?.question_uid] || ''}
                    onChange={(val) => {
                      setJustificationMap((prev) => ({
                        ...prev,
                        [currentGroup[0]?.question_uid]: val,
                      }));
                    }}
                    placeholder="Enter justification"
                    readOnly={false}
                  />
                )}
              </Box>
            </Box>
          ) : (
            'No questions for this department '
          )}

          {/* Right section */}
          <Box className={styles.rightSection}>
            <Box className={styles.aboutSection}>
              <InfoBox heading="About Industry" content={currentGroup[0].context} />
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
                // children="Back"
                variant="contained"
                color="primary"
                icon="left"
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                disabled={currentIndex === 0 || isSaving}
              >
                Back
              </CustomButton>
              <CustomButton
                // children={isSaving ? 'Saving...' : 'Save'}
                variant="contained"
                icon="save"
                type="button"
                onClick={async () => {
                  const success = await submitQuestionnaireAnswer();
                  if (!success) return;

                  // Move to next question in current department
                  if (currentIndex < groupKeys.length - 1) {
                    setCurrentIndex((prev) => prev + 1);
                    return;
                  }

                  // Move to next department
                  const currentDeptIndex = DEPARTMENT_LINKS.indexOf(departmentName);
                  const nextDept = DEPARTMENT_LINKS[currentDeptIndex + 1];

                  if (nextDept) {
                    dispatch(setPlantAssessmentDepartment(nextDept)); // ✅ Set next department in global state
                    setCurrentIndex(0); // ✅ Reset question index
                    triggerToast(`Moved to ${nextDept} department`, 'success');
                  } else {
                    // ✅ No more departments - navigate to preview
                    triggerToast('🎉 All department questions submitted!', 'success');
                    router.push(`/Preview/${tenantId}/${plantId}`);
                  }
                }}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Questionaire;
