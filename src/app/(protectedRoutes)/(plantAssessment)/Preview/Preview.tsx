'use client';

import { Box, Paper, Typography } from '@mui/material';
import styles from './Preview.module.css';
import React, { useEffect, useState } from 'react';
import { Question } from '../Questionaire/Questionaire.type';
import { useGetQuestionnairesListMutation, useSelectQuestionnairesAnswerMutation } from '../plantAssementApi';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import { useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { RootState } from '@/store/store';
import QuestionCard from '@/components/QuestionCard/QuestionCard';
import AnswerCard from '@/components/AnswerCard/AnswerCard';
import TextArea from '@/components/textArea/TextArea';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import InfoBox from '@/components/InfoBox/InfoBox';
import PreviewSideBox from '@/components/previewSideBox/PreviewSideBox';

export default function Preview() {
  const router = useRouter();
  const params = useParams();

  const plantId = params.PlantId as string;
  const tenantId = getValueLocalStorage('tenantId');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [departmentIndex, setDepartmentIndex] = useState<number>(0);
  const [groupedQuestions, setGroupedQuestions] = useState<{ [key: string]: Question[] }>({});
  const [groupKeys, setGroupKeys] = useState<string[]>([]);
  const [justificationMap, setJustificationMap] = useState<{ [question_uid: string]: string }>({});

  const [getQuestionnairesList, { isLoading }] = useGetQuestionnairesListMutation();
  const [selectQuestionnairesAnswer, { isLoading: isSaving }] = useSelectQuestionnairesAnswerMutation();

  const departmentName = [
    'R&D',
    // 'Planning',
    'Production',
    // 'Quality',
    // 'Maintenance',
    // 'Supply Chain Sales',
    // 'Supply Chain Purchase',
    'Finance',
    // 'Utilities',
    'IT',
    // 'L&D',
    // 'Management',
    'HR',
  ];
  const fetchQuestions = async (dept: string) => {
    try {
      const result = await getQuestionnairesList({
        tenantId,
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
    if (departmentName.length > 0) {
      fetchQuestions(departmentName[departmentIndex]);
    }
  }, [departmentIndex]);

  const handleAnswerClick = (answerId: string) => {
    const currentKey = groupKeys[currentIndex];

    const updatedGroup = groupedQuestions[currentKey].map((ans) => {
      if (ans.id === answerId) {
        return {
          ...ans,
          isselected: !ans.isselected, // Toggle selection
        };
      }
      return ans;
    });

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

  console.log('Preview groupedQuestions', groupedQuestions);

  const currentKey = groupKeys[currentIndex];
  const currentGroup = groupedQuestions[currentKey];
  // Calculate completed steps
  const completedSteps = groupKeys.reduce<number[]>((acc, key, index) => {
    const group = groupedQuestions[key];
    if (group?.some((q) => q.isselected)) acc.push(index);
    return acc;
  }, []);

  console.log('currentGroup', currentGroup);

  // Collect completed question UIDs
  const completedQuestionIds = groupKeys.filter((key) => groupedQuestions[key]?.some((q) => q.isselected));

  if (!currentGroup) return null;
  const questionText = currentGroup[0].question;

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
              {currentGroup && currentGroup[0]?.department}
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

          <Box className={styles.rightSection}>
            <Box className={styles.aboutSection}>
              <PreviewSideBox
                groupedQuestions={groupedQuestions}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                completedQuestionIds={completedQuestionIds}
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
                // color="warning"

                // onClick={()}
              >
                Edit
              </CustomButton>
              <CustomButton
                variant="contained"
                icon="submit"
                type="button"
                color="warning"
                // onClick={()}
                disabled={true}
              >
                Submit
              </CustomButton>
              <CustomButton
                variant="contained"
                icon="right"
                type="button"
                onClick={async () => {
                  const success = await submitQuestionnaireAnswer();
                  if (success) {
                    if (currentIndex < groupKeys.length - 1) {
                      // Move to next question
                      setCurrentIndex((prev) => prev + 1);
                    } else if (departmentIndex < departmentName.length - 1) {
                      // All questions in this department completed → move to next department
                      setDepartmentIndex((prev) => prev + 1);
                    } else {
                      alert('🎉 All department questions submitted!');
                    }
                  }
                }}
                disabled={isSaving}
              >
                {isLoading ? 'Saving...' : 'Next'}
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
