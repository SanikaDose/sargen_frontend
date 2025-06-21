'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Paper, Typography } from '@mui/material';
import styles from './../AssessmentBasedImpactValues/AssessmentBasedImpactValues.module.css';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import InfoBox from '@/components/InfoBox/InfoBox';
import { useDispatch } from 'react-redux';
import { setPageNameHeader } from '@/store/globalSlice';
import { pagesNames } from '@/constants/pagesHeaderNames';
import {
  useAddAboutTheCompanyMutation,
  useAddCommentMutation,
  useAddIntroductionMutation,
  useAddRoiMutation,
  useSummaryOfObservationsAndRecommendationsMutation,
} from './ReportDataApi';
import { PayloadType } from './ReportData.types';
import QuillTextArea from '@/components/QuillTextArea/QuillTextArea';

const questions = [
  'About the Company',
  'Introduction',
  'Summary of Observations and Recommendations.',
  'ROI',
  'Comments',
];

const AddReportData = () => {
  const params = useParams();
  const tenantId = getValueLocalStorage('tenantId') ?? '';
  const plantId = params.plantId as string;
  const dispatch = useDispatch();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [content, setContent] = useState('');

  dispatch(setPageNameHeader(pagesNames.assessorReportData));

  // Mutation hooks
  const [addAbout] = useAddAboutTheCompanyMutation();
  const [addIntro] = useAddIntroductionMutation();
  const [addSummary] = useSummaryOfObservationsAndRecommendationsMutation();
  const [addROI] = useAddRoiMutation();
  const [addComment] = useAddCommentMutation();

  const handleSave = async () => {
    const payload: PayloadType = {
      tenantId,
      plantId,
    };

    let mutationFn;

    switch (currentQuestionIndex) {
      case 0:
        payload.aboutTheCompany = content;
        mutationFn = addAbout;
        break;
      case 1:
        payload.introduction = content;
        mutationFn = addIntro;
        break;
      case 2:
        payload.summaryOfObservationsAndRecommendations = content;
        mutationFn = addSummary;
        break;
      case 3:
        payload.comment = content;
        mutationFn = addROI;
        break;
      case 4:
        payload.comment = content;
        mutationFn = addComment;
        break;
      default:
        return;
    }

    try {
      await mutationFn(payload).unwrap();
      setContent('');

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        alert('All questions submitted successfully!');
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <Box
      sx={{ height: '99%' }}
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
    >
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
          <Box className={styles.formContainer} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" gutterBottom>
              {questions[currentQuestionIndex]}
            </Typography>

            <Box sx={{ flex: 1 }}>
              <QuillTextArea value={content} onChange={setContent} placeholder="Enter your justification..." />
            </Box>
          </Box>

          <Box className={styles.rightSection}>
            <Box className={styles.aboutSection}>
              <InfoBox
                content="Please provide detailed justification for each of the following questions based on your assessment of the plant."
                heading="About Report Questions"
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
                onClick={() => {
                  if (currentQuestionIndex > 0) {
                    setCurrentQuestionIndex((prev) => prev - 1);
                  }
                }}
                disabled={currentQuestionIndex === 0}
              >
                Back
              </CustomButton>

              <CustomButton variant="contained" icon="save" type="submit">
                Save
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddReportData;
