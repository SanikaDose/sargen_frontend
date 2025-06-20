export const certificateData = [
  {
    id: 1,
    fileName: 'certificate_abc.pdf',
    version: '1.0',
    createdAt: '2024-01-01',
    updatedAt: '2024-05-01',
  },
  {
    id: 2,
    fileName: 'certificate_kd.pdf',
    version: '1.0',
    createdAt: '2024-01-01',
    updatedAt: '2024-05-01',
  },
  {
    id: 3,
    fileName: 'certificate_dfdg.pdf',
    version: '1.0',
    createdAt: '2024-01-01',
    updatedAt: '2024-05-01',
  },
  {
    id: 4,
    fileName: 'certificate_aifih.pdf',
    version: '1.0',
    createdAt: '2024-01-01',
    updatedAt: '2024-05-01',
  },
  {
    id: 4,
    fileName: 'certificate_aifih.pdf',
    version: '1.0',
    createdAt: '2024-01-01',
    updatedAt: '2024-05-01',
  },
  {
    id: 4,
    fileName: 'certificate_aifih.pdf',
    version: '1.0',
    createdAt: '2024-01-01',
    updatedAt: '2024-05-01',
  },

  {
    id: 2,
    fileName: 'certificate_kd.pdf',
    version: '1.0',
    createdAt: '2024-01-01',
    updatedAt: '2024-05-01',
  },
  {
    id: 3,
    fileName: 'certificate_dfdg.pdf',
    version: '1.0',
    createdAt: '2024-01-01',
    updatedAt: '2024-05-01',
  },
  {
    id: 4,
    fileName: 'certificate_aifih.pdf',
    version: '1.0',
    createdAt: '2024-01-01',
    updatedAt: '2024-05-01',
  },
  {
    id: 4,
    fileName: 'certificate_aifih.pdf',
    version: '1.0',
    createdAt: '2024-01-01',
    updatedAt: '2024-05-01',
  },
  {
    id: 4,
    fileName: 'certificate_aifih.pdf',
    version: '1.0',
    createdAt: '2024-01-01',
    updatedAt: '2024-05-01',
  },
  {
    id: 4,
    fileName: 'certificate_aifih.pdf',
    version: '1.0',
    createdAt: '2024-01-01',
    updatedAt: '2024-05-01',
  },
];

export const fileUploadKeyMap: { [key: string]: string } = {
  'Questionnaire ': 'questionnaires_',
  'Cost Profile': 'cost_profile_',
  'KPI Selection': 'kpi_selection_',
  'Industry Selection': 'industry_selection_',
  'Planning Horizon': 'planning_horizon_',
  'Cost Profile LookUp': 'cost_lookup_table_',
  'Industry Selection LookUp': 'industry_selection_lookup_table_',
  'KPI Selection LookUp': 'kpi_lookup_table_',
  'Industry Assessment Matrix': 'assessment_matrix_score_lookup_table_',
  'Solution Metadata': 'solutions_with_band_weights_',
  'Band Definition ': 'band_definition_table_',
};

export const allowedExtensions = ['.csv', '.xls', '.xlsx'];

export const fileTypes = Object.keys(fileUploadKeyMap); // display keys
export const fileValues = Object.values(fileUploadKeyMap); //display values
