import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StepperState {
  activeStep: number;
  completedSteps: number[];
  steps: { label: string }[];
}

const initialState: StepperState = {
  activeStep: 0,
  completedSteps: [],
  steps: [
    { label: 'Cost Profile' },
    { label: 'KPI Definition' },
    { label: 'Planning Horizon' },
    { label: 'Industry Selection' },
  ],
};

const stepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    setActiveStep(state, action: PayloadAction<number>) {
      state.activeStep = action.payload;
    },

    markStepCompleted(state, action: PayloadAction<number>) {
      const step = action.payload;
      if (!state.completedSteps.includes(step)) {
        state.completedSteps.push(step);
      }
    },

    markStepIncomplete(state, action: PayloadAction<number>) {
      // For backward logic (optional)
      state.completedSteps = state.completedSteps.filter((s) => s !== action.payload);
    },

    resetStepper(state) {
      state.activeStep = 0;
      state.completedSteps = [];
    },
  },
});

export const { setActiveStep, markStepCompleted, markStepIncomplete, resetStepper } = stepperSlice.actions;

export default stepperSlice.reducer;
