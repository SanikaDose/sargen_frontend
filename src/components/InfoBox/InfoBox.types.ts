import { Box } from '@mui/material';

export interface InfoBoxProps {
  heading?: string;
  content?: string;
  className?: string;
  sx?: React.ComponentProps<typeof Box>['sx'];
}
