'use client';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import InfoBox from '@/components/InfoBox/InfoBox';
import Stepper from '@/components/Stepper/Stepper';
import styles from './Questionaire.module.css';
import { Box, RadioGroup, Typography } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/QuestionCard/QuestionCard';
import AnswerCard from '@/components/AnswerCard/AnswerCard';

const Questionaire = () => {
  const router = useRouter();
  const isLoading = false;

  return (
    <Box sx={{ height: '100%' }} component="form">
      <Box className={styles.stepperContainer}>{/* Stepper goes here if needed */}</Box>
      <Box className={styles.formSection}>
        <Box sx={{ width: '100%', height: '100%', display: 'flex' }} className={styles.bothSections}>
          <Box component="form" className={styles.formContainer}>
            <Typography
              variant="h6"
              sx={{
                color: 'black',
                textAlign: 'left',
                width: '100%',
              }}
            >
              Questionaire
            </Typography>
            <Box className={styles.questionAnsweresSection}>
              <Box className={styles.questionSection}>
                <QuestionCard
                  questionNumber={1}
                  questionText="How is product Design and WORK INSTRUCTIONS transferred to manufacturing so that they know how to produce it?"
                />

                <Box className={styles.answerSection}>
                  {' '}
                  <AnswerCard
                    answerNumber={1}
                    answerText="How is product design and work instructions transferred to manufacturing?"
                    isSelected={false}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className={styles.rightSection}>
            <Box className={styles.aboutSection}>
              <InfoBox content="Lorem ipsum dolor sit amet, consectetur adipiscing elit..." heading="About Industry" />
            </Box>

            <Box className={styles.buttonSection}>
              <CustomButton
                children="Back"
                variant="contained"
                color="primary"
                icon="left"
                type="button"
                onClick={() => router.back()}
              />
              <CustomButton children={isLoading ? 'Saving...' : 'Save'} variant="contained" icon="save" type="submit" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Questionaire;
