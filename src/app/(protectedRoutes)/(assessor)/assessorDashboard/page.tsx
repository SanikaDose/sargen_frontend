import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const AssessorDashboardPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, Assessor!
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Pending Assessments
            </Typography>
            <Typography variant="h4" color="primary">
              8
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Meetings
            </Typography>
            <Typography variant="h4" color="secondary">
              2
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Completed Reviews
            </Typography>
            <Typography variant="h4" color="success.main">
              14
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Average Score
            </Typography>
            <Typography variant="h4" color="info.main">
              87%
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Feedbacks
            </Typography>
            <Typography variant="body1">“Great attention to detail in evaluation.” — Manager</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AssessorDashboardPage;
