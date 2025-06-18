export type StepperProps = {
  steps: { label: string }[];
  activeStep?: number;
  completedSteps?: number[];
};
