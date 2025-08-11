import { createSlice } from '@reduxjs/toolkit';

type PlantAssessmentState = {
  questionnairesDeparment: string;
};

const initialState: PlantAssessmentState = {
  questionnairesDeparment: 'Management',
};

const PlantAssessmentStateSlice = createSlice({
  name: 'plantAssessment',
  initialState,
  reducers: {
    setPlantAssessmentDepartment: (state, actions) => {
      state.questionnairesDeparment = actions.payload;
    },
  },
});

export const { setPlantAssessmentDepartment } = PlantAssessmentStateSlice.actions;
export default PlantAssessmentStateSlice.reducer;
