'use client';

import { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useChangeAssessmentStatusMutation, useDownloadReportMutation, useViewFinalReportMutation } from './ReportFinalizedPageApi';
import { CustomButton } from '@/components/CustomButton/CustomButton';

import styles from '../AssessmentBasedImpactValues/AssessmentBasedImpactValues.module.css';
import { pagesNames } from '@/constants/pagesHeaderNames';
import { setPageNameHeader, setShowAssessmentListSideBar } from '@/store/globalSlice';
import { useDispatch } from 'react-redux';
import { useGetReportDataMutation } from '../AddReportData/ReportDataApi';
import ReportTextSection from '@/components/ReportCardtext/ReportTextSection';
import Loader from '@/components/Loader/Loader';
import { AsseessmentStatus } from '@/constants/enums';
import { setPlantAssessmentDepartment } from '../../(plantAssessment)/plantAssementSlice';

export default function ReportFinalisedPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const tenantId = params.organisationId as string;
  const plantId = params.plantId as string;

  const [reportData, setReportData] = useState<string[]>([]);

  useEffect(() => {
    dispatch(setPageNameHeader(pagesNames.reportFinalized));
    dispatch(setShowAssessmentListSideBar(false));
    dispatch(setPlantAssessmentDepartment(''));
  }, [dispatch]);

  const [reportUrl, setReportUrl] = useState<string | null>(null);
  // const [createReport, { isLoading: isCreating }] = useCreateReportMutation();
  const [downloadReport, { isLoading: isDownloading }] = useDownloadReportMutation();
  const [postAssesmentStatus, { isLoading: assesmentStatusLoading }] = useChangeAssessmentStatusMutation();
  const [viewFinalizedReport, { isLoading: isViewing }] = useViewFinalReportMutation();
  const isLoading = isViewing || assesmentStatusLoading || isDownloading;
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

  useEffect(() => {
    const generateAndPreviewReport = async () => {
      try {
        const viewRes = await viewFinalizedReport({ tenantId, plantId }).unwrap();

        setReportUrl(viewRes?.url || '');
      } catch (err) {
        console.error('Error generating or previewing report:', err);
      }
    };

    generateAndPreviewReport();
  }, []);
  const handleDownloadReport = async () => {
    const payload = { tenantId, plantId };

    try {
      const { blob, filename } = await downloadReport(payload).unwrap();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      await postAssesmentStatus({
        tenantId,
        plantId,
        assessment: AsseessmentStatus.FINISH_ASSESSMENT,
      }).unwrap();

      router.push('/AssignedPlantsList');
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

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
            {isLoading ? (
              <Box sx={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader loading={isLoading} />
              </Box>
            ) : (
              <Box sx={{ flex: 1, position: 'relative' }}>
                <iframe
                  src={reportUrl ?? undefined}
                  title="Report Preview"
                  width="100%"
                  height="100%"
                  style={{ border: '1px solid #ccc', borderRadius: '16px' }}
                />
              </Box>
            )}
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
                type="button"
                onClick={() => {
                  router.push(`/AssignedPlantsList`);
                }}
              >
                Home
              </CustomButton>

              <CustomButton
                variant="contained"
                onClick={() => {
                  handleDownloadReport();
                }}
                disabled={isDownloading}
              >
                Download
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
