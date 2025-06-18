'use client';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import InfoBox from '@/components/InfoBox/InfoBox';
import Stepper from '@/components/Stepper/Stepper';
import styles from './Questionaire.module.css';
import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import QuestionCard from '@/components/QuestionCard/QuestionCard';
import AnswerCard from '@/components/AnswerCard/AnswerCard';
import { useGetQuestionnairesListMutation, useSelectQuestionnairesAnswerMutation } from '../plantAssementApi';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Question } from './Questionaire.type';
import TextArea from '@/components/textArea/TextArea';
import { showToast } from '@/components/toaster/toasterSlice';
import Loader from '@/components/Loader/Loader';

const Questionaire = () => {
  const router = useRouter();
  const params = useParams();

  const plantId = params.PlantId as string;
  const department = useSelector(
    (state: RootState) => (state as RootState).plantAssessmentGlobal.questionnairesDeparment,
  );
  const tenantId = getValueLocalStorage('tenantId');

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [groupedQuestions, setGroupedQuestions] = useState<{ [key: string]: Question[] }>({});
  const [groupKeys, setGroupKeys] = useState<string[]>([]);
  const [justificationMap, setJustificationMap] = useState<{ [question_uid: string]: string }>({});
  const steps = groupKeys.map((_, index) => ({
    label: `${index + 1}`,
  }));
  const [getQuestionnairesList, { isLoading }] = useGetQuestionnairesListMutation();
  const [selectQuestionnairesAnswer, { isLoading: isSaving }] = useSelectQuestionnairesAnswerMutation();
  const fetchQuestions = async () => {
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

    const justificationState: { [key: string]: string } = {};
    console.log('questions', questions);

    questions.forEach((q: Question) => {
      if (q.isselected) {
        justificationState[q.question_uid] = q.justification || '';
      }
    });

    setGroupedQuestions(grouped);
    setGroupKeys(Object.keys(grouped));
    setJustificationMap(justificationState);
    setCurrentIndex(0);
  };
  console.log('groupedQuestions', groupedQuestions);

  useEffect(() => {
    fetchQuestions();
  }, [department]);

  const handleAnswerClick = (answerId: string) => {
    const currentKey = groupKeys[currentIndex];

    const updatedGroup = groupedQuestions[currentKey].map((ans) => ({
      ...ans,
      isselected: ans.id === answerId,
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
    <>
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
            <Box className={styles.formContainer}>
              <Typography
                variant="h6"
                sx={{
                  color: 'black',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                {department}
              </Typography>

              {isLoading || isSaving ? (
                <Loader loading={isLoading} />
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
                        answerText={option.answer ?? ''}
                        isSelected={option.isselected}
                        onClick={() => handleAnswerClick(option.id)}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              <Box className={styles.justification}>
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
              </Box>
            </Box>

            {/* Right section */}
            <Box className={styles.rightSection}>
              <Box className={styles.aboutSection}>
                <InfoBox
                  heading="About Industry"
                  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
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
                  children="Back"
                  variant="contained"
                  color="primary"
                  icon="left"
                  type="button"
                  onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                  disabled={currentIndex === 0 || isSaving}
                />
                <CustomButton
                  children={isSaving ? 'Saving...' : 'Save'}
                  variant="contained"
                  icon="save"
                  type="button"
                  onClick={async () => {
                    const success = await submitQuestionnaireAnswer();
                    if (success) {
                      if (currentIndex === groupKeys.length - 1) {
                        alert('All questions submitted!');
                      } else {
                        setCurrentIndex((prev) => prev + 1);
                      }
                    }
                  }}
                  disabled={isSaving}
                />
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Questionaire;
