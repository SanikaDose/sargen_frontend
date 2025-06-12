import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PlantAssessmentState = {
  questionnairesDeparment: string;
};

const initialState: PlantAssessmentState = {
  questionnairesDeparment: 'R&D',
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
