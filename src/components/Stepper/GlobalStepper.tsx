'use client';

import { Grid, Step, StepLabel, Stepper as MuiStepper, Paper } from '@mui/material';
import { useStepper } from '@/store/useStepper';

export const GlobalStepper = () => {
  const { steps, activeStep, completedSteps, visible } = useStepper();

  if (!visible) return null;

  return (
    <Grid container justifyContent="center" width="100%">
      <Grid size={{ xs: 12, md: 8 }}>
        <Paper
          elevation={2}
          sx={{
            borderRadius: '16px',
            p: 2,
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
            border: '1px solid rgb(216, 216, 216)',
          }}
        >
          <MuiStepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={step.label} completed={completedSteps.includes(index)}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </MuiStepper>
        </Paper>
      </Grid>
    </Grid>
  );
};
