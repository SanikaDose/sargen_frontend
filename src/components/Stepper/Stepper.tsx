import { Stepper as MuiStepper, Step, StepLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import { StepperProps } from './Stepper.types';

const Stepper: React.FC<StepperProps> = ({ steps = [], activeStep = 0, completedSteps = [] }) => {
  console.log('activeStep', activeStep);
  console.log('completedSteps', completedSteps);

  return (
    <Grid container justifyContent="center" width="100%">
      <Grid size={{ xs: 4, md: 12 }}>
        <MuiStepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={step.label} completed={completedSteps.includes(index)}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </MuiStepper>
      </Grid>
    </Grid>
  );
};

export default Stepper;
