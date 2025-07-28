export const fileUploadKeyMap: { [key: string]: string } = {
  Questionnaires: 'questionnaires_',
  'Cost Profile': 'cost_profile_',
  'KPI Selection': 'kpi_selection_',
  'Industry Selection': 'industry_selection_',
  'Planning Horizon': 'planning_horizon_',
  'Cost Profile LookUp': 'cost_lookup_table_',
  'Industry Selection LookUp': 'industry_selection_lookup_table_',
  'KPI Selection LookUp': 'kpi_lookup_table_',
  // 'Industry Assessment Matrix LookUp': 'assessment_matrix_score_lookup_table_',
  'Solutions Metadata': 'solutions_with_band_weights_',
  'Band Definitions': 'band_definition_table_',
};

export const allowedExtensions = ['.csv', '.xls', '.xlsx'];

export const fileTypes = Object.keys(fileUploadKeyMap); // display keys
export const fileValues = Object.values(fileUploadKeyMap); //display values
