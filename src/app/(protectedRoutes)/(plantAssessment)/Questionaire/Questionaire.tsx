'use client';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import InfoBox from '@/components/InfoBox/InfoBox';
import Stepper from '@/components/Stepper/Stepper';
import styles from './Questionaire.module.css';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import QuestionCard from '@/components/QuestionCard/QuestionCard';
import AnswerCard from '@/components/AnswerCard/AnswerCard';
import { useGetQuestionnairesListMutation, useSelectQuestionnairesAnswerMutation } from '../plantAssementApi';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Question } from './Questionaire.type';

const Questionaire = () => {
  const router = useRouter();
  const params = useParams();

  const organisationId = params.OrganisationId as string;
  const plantId = params.PlantId as string;
  const department = useSelector((state: RootState) => state.plantAssessmentGlobal.questionnairesDeparment);
  const tenantId = getValueLocalStorage('tenantId');
  const isLoading = false;

  const steps = [
    'First Name',
    'Last Name',
    'Email Mail',
    'Contact No.',
    'Designation',
    'Country',
    'Employee Id',
    'Job Role',
  ].map((label) => ({ label }));

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [groupedQuestions, setGroupedQuestions] = useState<{ [key: string]: Question[] }>({});
  const [groupKeys, setGroupKeys] = useState<string[]>([]);

  const [getQuestionnairesList] = useGetQuestionnairesListMutation();
  const [selectQuestionnairesAnswer] = useSelectQuestionnairesAnswerMutation();
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

    setGroupedQuestions(grouped);
    setGroupKeys(Object.keys(grouped));
    setCurrentIndex(0);
  };

  useEffect(() => {
    fetchQuestions();
  }, [department]);

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
      <Box className={styles.stepperContainer}>
        <Stepper steps={steps} />
      </Box>

      <Box className={styles.formSection}>
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
          </Box>

          <Box className={styles.rightSection}>
            <Box className={styles.aboutSection}>
              <InfoBox
                heading="About Industry"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac nulla arcu. Nam accumsan vel lectus nec ullamcorper. Sed euismod ultrices velit, nec dignissim tortor aliquam eu..."
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
                disabled={currentIndex === 0}
              />
              <CustomButton
                children={isLoading ? 'Saving...' : 'Save'}
                variant="contained"
                icon="save"
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, groupKeys.length - 1))}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Questionaire;
