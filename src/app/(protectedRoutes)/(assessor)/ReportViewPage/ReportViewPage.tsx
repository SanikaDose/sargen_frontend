'use client';
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
import { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useCreateReportMutation, useViewReportMutation } from './ReportViewApi';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import InfoBox from '@/components/InfoBox/InfoBox';
import styles from './ReportView.module.css';

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';

// ✅ Proper worker setup for client-side Next.js

export default function ReportViewPage() {
  const router = useRouter();
  const params = useParams();
  const tenantId = params.organisationId as string;
  const plantId = params.plantId as string;

  const [reportUrl, setReportUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [createReport, { isLoading: isCreating }] = useCreateReportMutation();
  const [viewReport, { isLoading: isViewing }] = useViewReportMutation();

  useEffect(() => {
    const generateAndPreviewReport = async () => {
      try {
        const createRes = await createReport({ tenantId, plantId }).unwrap();
        console.log('Report created:', createRes);

        const viewRes = await viewReport({ tenantId, plantId }).unwrap();
        console.log('Report preview data:', viewRes);

        setReportUrl(viewRes?.url || '');
      } catch (err) {
        console.error('Error generating or previewing report:', err);
      }
    };

    generateAndPreviewReport();
  }, [tenantId, plantId, createReport, viewReport]);

  return (
    <Box sx={{ height: '100%', p: 2 }}>
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
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }} className={styles.bothSections}>
          {/* Left Section */}
          <Box className={styles.formContainer} sx={{ flex: 1, p: 2 }}>
            <Typography variant="h4" sx={{ color: 'black', mb: 2 }}>
              Report
            </Typography>

            {reportUrl ? (
              <Document file={reportUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)} loading="Loading PDF...">
                {Array.from(new Array(numPages), (_, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} width={600} renderTextLayer={false} />
                ))}
              </Document>
            ) : (
              <Typography variant="body1" sx={{ mt: 2 }}>
                {isCreating || isViewing ? 'Loading report preview...' : 'No report available.'}
              </Typography>
            )}
          </Box>

          {/* Right Section */}
          <Box className={styles.rightSection} sx={{ flex: 1, p: 2 }}>
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
              p={2}
              mt={3}
              sx={{ background: '#F5FAFD', height: '70px', borderRadius: '16px' }}
              className={styles.buttonSection}
            >
              <CustomButton variant="contained" color="primary" icon="left" type="button" onClick={() => router.back()}>
                Back
              </CustomButton>

              <CustomButton variant="contained" icon="save" type="submit" disabled>
                Save
              </CustomButton>

              <CustomButton
                variant="contained"
                color="primary"
                icon="right"
                type="button"
                onClick={() => {
                  if (reportUrl) window.open(reportUrl, '_blank');
                }}
                disabled={!reportUrl}
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
