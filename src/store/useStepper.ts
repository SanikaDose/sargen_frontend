// store/useStepper.ts
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { initSteps, goToStep, showStepper, hideStepper } from './stepperSlice';

export const useStepper = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.stepper);

  return {
    ...state,
    initSteps: (steps: { label: string; path: string }[]) => dispatch(initSteps(steps)),
    goTo: (index: number) => dispatch(goToStep(index)),
    show: () => dispatch(showStepper()),
    hide: () => dispatch(hideStepper()),
  };
};
