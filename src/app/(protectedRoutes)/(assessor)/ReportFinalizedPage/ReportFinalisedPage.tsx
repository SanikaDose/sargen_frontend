'use client';

import { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useCreateReportMutation, useViewReportMutation } from './ReportFinalizedPageApi';
import { CustomButton } from '@/components/CustomButton/CustomButton';

import styles from '../AssessmentBasedImpactValues/AssessmentBasedImpactValues.module.css';
import { pagesNames } from '@/constants/pagesHeaderNames';
import { setPageNameHeader, setShowAssessmentListSideBar } from '@/store/globalSlice';
import { setPlantAssessmentDepartment } from '../../(plantAssessment)/plantAssementSlice';
import { useDispatch } from 'react-redux';
import { useGetReportDataMutation } from '../AddReportData/ReportDataApi';
import ReportTextSection from '@/components/ReportCardtext/ReportTextSection';

export default function ReportFinalisedPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const tenantId = params.organisationId as string;
  const plantId = params.plantId as string;

  const [reportData, setReportData] = useState<string[]>(new Array());
  useEffect(() => {
    dispatch(setPageNameHeader(pagesNames.reportFinalized));
    // dispatch(setShowAssessmentListSideBar(true));
    // dispatch(setPlantAssessmentDepartment(''));
  }, [dispatch]);

  const [reportUrl, setReportUrl] = useState<string | null>(null);
  const [createReport, { isLoading: isCreating }] = useCreateReportMutation();
  const [viewReport, { isLoading: isViewing }] = useViewReportMutation();

  const [getReportData] = useGetReportDataMutation();

  // Utility to strip HTML tags
  const stripHtml = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const payload = { tenantId, plantId };
        const result = await getReportData(payload);

        const response = result?.data?.[0];
        if (!response) return;

        const rawHtmlData = [
          response.aboutCompany || '',
          response.introduction || '',
          response.summaryOfObservationsAndRecommendations || '',
          response.roi || '',
          response.comment || '',
        ];

        // Strip HTML and store plain text
        const plainTextData = rawHtmlData.map(stripHtml);
        setReportData(plainTextData);
      } catch (error) {
        console.error('Failed to fetch report data:', error);
      }
    };

    if (tenantId && plantId) fetchReportData();
  }, []);

  console.log('reportData', reportData);

  useEffect(() => {
    const generateAndPreviewReport = async () => {
      try {
        const createRes = await createReport({ tenantId, plantId }).unwrap();
        const viewRes = await viewReport({ tenantId, plantId }).unwrap();

        setReportUrl(viewRes?.url || '');
      } catch (err) {
        console.error('Error generating or previewing report:', err);
      }
    };

    generateAndPreviewReport();
  }, [tenantId, plantId, createReport, viewReport]);

  console.log('url', reportUrl);

  return (
    <Box sx={{ height: '99%' }}>
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
            <Box sx={{ flex: 1, position: 'relative' }}>
              <iframe
                src={reportUrl}
                type="application/pdf"
                title="Report Preview"
                width="100%"
                height="100%"
                style={{ border: '1px solid #ccc', borderRadius: '12px' }}
              />
            </Box>
          </Box>

          <Box className={styles.rightSection}>
            <Box className={styles.aboutSection}>
              <ReportTextSection reportData={reportData} />
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
                // icon="left"
                type="button"
                // onClick={handleBack}
                // disabled={currentQuestionIndex === 0 || isLoading}
              >
                Home
              </CustomButton>

              <CustomButton variant="contained">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}></Box>
                Download
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
