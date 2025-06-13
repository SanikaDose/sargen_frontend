import { Stepper as MuiStepper, Step, StepLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { StepperProps } from './Stepper.types';

const Stepper: React.FC<StepperProps> = ({ steps = [], activeStep = 0, completedSteps = [] }) => {
  return (
    <Grid container justifyContent="center" width="100%">
      <Grid size={{ xs: 4, md: 12 }}>
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

export default Stepper;
