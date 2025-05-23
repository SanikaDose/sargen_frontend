import { Stepper as MuiStepper, Step, StepLabel } from '@mui/material';
import Grid from '@mui/material/Grid';

const Stepper = () => {
  const steps = [{ label: 'Test' }, { label: 'Test2' }, { label: 'Test3' }];
  const activeStep = 1;
  const completedSteps = [0, 2];
  return (
    <Grid container justifyContent="center" sx={{ height: '100vh', width: '100vw' }}>
      <Grid size={{ xs: 4, md: 12 }}>
        <MuiStepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => {
            const stepProps: { completed?: boolean } = {};
            if (index < activeStep) stepProps.completed = true;

            return (
              <Step key={step.label} {...stepProps} completed={completedSteps.includes(index)}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            );
          })}
        </MuiStepper>
      </Grid>
    </Grid>
  );
};

export default Stepper;
