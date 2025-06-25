'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import styles from './../AssessmentBasedImpactValues/AssessmentBasedImpactValues.module.css';
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
  useGetReportDataMutation,
} from './ReportDataApi';
import { PayloadType } from './ReportData.types';
import QuillTextArea from '@/components/QuillTextArea/QuillTextArea';

const questions = ['About the Company', 'Introduction', 'Summary of Observations and Recommendations.', 'ROI', 'Comments'];

const AddReportData = () => {
  const params = useParams();
  const tenantId = params.organisationId as string;
  const plantId = params.plantId as string;
  const dispatch = useDispatch();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Store content for each question separately
  const [questionContents, setQuestionContents] = useState<string[]>(new Array(questions.length).fill(''));

  // Current content is derived from questionContents array
  const content = questionContents[currentQuestionIndex];

  dispatch(setPageNameHeader(pagesNames.assessorReportData));

  // Mutation hooks
  const [addAbout] = useAddAboutTheCompanyMutation();
  const [addIntro] = useAddIntroductionMutation();
  const [addSummary] = useSummaryOfObservationsAndRecommendationsMutation();
  const [addROI] = useAddRoiMutation();
  const [addComment] = useAddCommentMutation();
  const [getReportData] = useGetReportDataMutation();

  // Fetch existing report data on component mount
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setIsInitialLoading(true);
        const payload = {
          tenantId,
          plantId,
        };

        const response = await getReportData(payload).unwrap();

        // Map the response data to the questions array
        const existingData = [
          response.aboutTheCompany || '',
          response.introduction || '',
          response.summaryOfObservationsAndRecommendations || '',
          response.roi || '',
          response.comment || '',
        ];

        setQuestionContents(existingData);
      } catch (error) {
        console.error('Failed to fetch report data:', error);
        // Keep the empty array if fetch fails
      } finally {
        setIsInitialLoading(false);
      }
    };

    if (tenantId && plantId) {
      fetchReportData();
    }
  }, [tenantId, plantId, getReportData]);

  // Update content for current question
  const handleContentChange = (newContent: string) => {
    setQuestionContents((prev) => {
      const updated = [...prev];
      updated[currentQuestionIndex] = newContent;
      return updated;
    });
  };

  const handleSave = async () => {
    setIsLoading(true);

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
        setIsLoading(false);
        return;
    }

    try {
      await mutationFn(payload).unwrap();

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        alert('All questions submitted successfully!');
      }
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Show loading spinner while fetching initial data
  if (isInitialLoading) {
    return (
      <Box
        sx={{
          height: '99%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={40} />
          <Typography variant="body2" color="text.secondary">
            Loading report data...
          </Typography>
        </Box>
      </Box>
    );
  }

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

            <Box sx={{ flex: 1, position: 'relative' }}>
              <QuillTextArea value={content} onChange={handleContentChange} placeholder="Enter your content here..." disabled={isLoading} />

              {/* Loading overlay for the content area */}
              {isLoading && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    borderRadius: '4px',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <CircularProgress size={40} />
                    <Typography variant="body2" color="text.secondary">
                      Saving {questions[currentQuestionIndex]}...
                    </Typography>
                  </Box>
                </Box>
              )}
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
                onClick={handleBack}
                disabled={currentQuestionIndex === 0 || isLoading}
              >
                Back
              </CustomButton>

              <CustomButton variant="contained" icon="save" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={16} color="inherit" />
                    Saving...
                  </Box>
                ) : (
                  'Save'
                )}
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddReportData;
