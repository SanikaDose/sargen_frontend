'use client';

import { Box, Divider, Typography } from '@mui/material';
import styles from './Reportcard.module.css';

interface ReportTextSectionProps {
  reportData: string[]; // expected order: aboutCompany, introduction, summary, roi, comment
  className?: string;
  sx?: object;
}

const sectionTitles = ['About Industry', 'Introduction', 'Summary of Observations & Recommendations', 'ROI', 'Comment'];

export default function ReportTextSection({ reportData, className = '', sx = {} }: ReportTextSectionProps) {
  return (
    <Box
      className={className}
      sx={{
        height: '100%',
        borderRadius: '16px',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        bgcolor: '#F5FAFD',
        gap: 1,
        ...sx,
      }}
    >
      {reportData.map((text, index) => (
        <Box
          key={index}
          sx={{
            borderRadius: '16px',
            p: 2,
            display: 'flex',
            flexDirection: 'column',

            // boxShadow: '0 0 8px rgba(0,0,0,0.05)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: 'darkgrey',
            }}
          >
            {sectionTitles[index] || `Section ${index + 1}`}
          </Typography>

          <Box
            sx={{
              color: 'text.secondary',
              lineHeight: 1.5,
              flexGrow: 1,
              textAlign: 'justify',
              fontSize: 'medium',
              whiteSpace: 'pre-wrap',
            }}
          >
            {text?.trim() || 'No content available for this section.'}
          </Box>

          {index !== reportData.length - 1 && <Divider sx={{ mt: 2 }} />}
        </Box>
      ))}
    </Box>
  );
}
