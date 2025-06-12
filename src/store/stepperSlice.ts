// store/stepperSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Step {
  label: string;
  path: string;
}

interface StepperState {
  steps: Step[];
  activeStep: number;
  completedSteps: number[];
  visible: boolean;
}

const initialState: StepperState = {
  steps: [],
  activeStep: 0,
  completedSteps: [],
  visible: false,
};

const stepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    initSteps(state, action: PayloadAction<Step[]>) {
      state.steps = action.payload;
      state.activeStep = 0;
      state.completedSteps = [];
    },
    goToStep(state, action: PayloadAction<number>) {
      state.activeStep = action.payload;
      if (!state.completedSteps.includes(action.payload - 1) && action.payload > 0) {
        state.completedSteps.push(action.payload - 1);
      }
    },
    showStepper(state) {
      state.visible = true;
    },
    hideStepper(state) {
      state.visible = false;
    },
  },
});

export const { initSteps, goToStep, showStepper, hideStepper } = stepperSlice.actions;
export default stepperSlice.reducer;
