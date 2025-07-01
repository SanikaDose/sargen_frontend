'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import styles from './../AssessmentBasedImpactValues/AssessmentBasedImpactValues.module.css';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import InfoBox from '@/components/InfoBox/InfoBox';
import { useDispatch } from 'react-redux';
import { setPageNameHeader, setShowAssessmentListSideBar } from '@/store/globalSlice';
import { pagesNames } from '@/constants/pagesHeaderNames';
import {
  useAddAboutTheCompanyMutation,
  useAddCommentMutation,
  useAddIntroductionMutation,
  useAddRoiMutation,
  useAddSummaryOfObservationsAndRecommendationsMutation,
  useGetReportDataMutation,
} from './ReportDataApi';
import { PayloadType } from './ReportData.types';
import QuillTextArea from '@/components/QuillTextArea/QuillTextArea';
import { setPlantAssessmentDepartment } from '../../(plantAssessment)/plantAssementSlice';

const questions = ['About the Company', 'Introduction', 'Summary of Observations and Recommendations.', 'ROI', 'Comments'];

const AddReportData = () => {
  const params = useParams();

  const router = useRouter();
  const tenantId = params.organisationId as string;
  const plantId = params.plantId as string;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageNameHeader(pagesNames.reportData));
    dispatch(setShowAssessmentListSideBar(true));
    dispatch(setPlantAssessmentDepartment(''));
  }, [dispatch]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const [questionContents, setQuestionContents] = useState<string[]>(new Array(questions.length).fill(''));
  const contentRef = useRef(''); // Always holds latest content

  // const content = questionContents[currentQuestionIndex];

  // Update page name header once
  useEffect(() => {
    dispatch(setPageNameHeader(pagesNames.assessorReportData));
  }, [dispatch]);

  const [addAbout] = useAddAboutTheCompanyMutation();
  const [addIntro] = useAddIntroductionMutation();
  const [addSummary] = useAddSummaryOfObservationsAndRecommendationsMutation();
  const [addROI] = useAddRoiMutation();
  const [addComment] = useAddCommentMutation();
  // const [getReportData] = useGetReportDataMutation();

  const [getReportData] = useGetReportDataMutation();

  // Fetch report data on mount
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setIsInitialLoading(true);
        const payload = { tenantId, plantId };
        const result = await getReportData(payload);

        const response = result?.data?.[0];

        if (!response) return;

        const existingData = [
          response.aboutCompany || '',
          response.introduction || '',
          response.summaryOfObservationsAndRecommendations || '',
          response.roi || '',
          response.comment || '',
        ];

        setQuestionContents(existingData);
        contentRef.current = existingData[0];
      } catch (error) {
        console.error('Failed to fetch report data:', error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    if (tenantId && plantId) fetchReportData();
  }, [tenantId, plantId, getReportData]);

  useEffect(() => {
    if (!isInitialLoading && questionContents.length) {
      contentRef.current = questionContents[currentQuestionIndex];
    }
  }, [questionContents, isInitialLoading, currentQuestionIndex]);

  const handleContentChange = (newContent: string) => {
    contentRef.current = newContent;

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

    // ✅ Log for debugging
    console.log(`Saving for "${questions[currentQuestionIndex]}":`, contentRef.current);

    let mutationFn;

    switch (currentQuestionIndex) {
      case 0:
        payload.aboutTheCompany = contentRef.current;
        mutationFn = addAbout;
        break;
      case 1:
        payload.introduction = contentRef.current;
        mutationFn = addIntro;
        break;
      case 2:
        payload.summaryOfObservationsAndRecommendations = contentRef.current;
        mutationFn = addSummary;
        break;
      case 3:
        payload.roi = contentRef.current;
        mutationFn = addROI;
        break;
      case 4:
        payload.comment = contentRef.current;
        mutationFn = addComment;
        break;
      default:
        setIsLoading(false);
        return;
    }

    try {
      await mutationFn(payload).unwrap();

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => {
          const nextIndex = prev + 1;
          contentRef.current = questionContents[nextIndex]; // update ref to next question content
          return nextIndex;
        });
      } else {
        router.push(`/ReportViewPage/${tenantId}/${plantId}`);
      }
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => {
        const prevIndex = prev - 1;
        contentRef.current = questionContents[prevIndex]; // sync ref
        return prevIndex;
      });
    }
  };

  if (isInitialLoading) {
    return (
      <Box sx={{ height: '99%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
              <QuillTextArea
                key={currentQuestionIndex}
                value={questionContents[currentQuestionIndex]}
                onChange={handleContentChange}
                placeholder="Enter your content here..."
                disabled={isLoading}
              />

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
