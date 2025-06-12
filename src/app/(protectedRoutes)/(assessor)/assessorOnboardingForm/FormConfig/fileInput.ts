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
  }, {
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
  }, {
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
    "Questionnaire ": "questionnaires",
    "Cost Profile": "costProfile",
    "KPI Selection": "kpi",
    "Industry Selection": "industrySelection",
    "Planning Horizon": "planningHorizon",
    "Cost Profile LookUp": "costProfileLookUpTable",
    "Industry Selection LookUp": "industrySelectionLookUpTable",
    "KPI Selection LookUp": "kpiSelectionLookUpTable",
    "Industry Assessment Matrix": "industryAssessmentMatrix",
    "Solution Metadata":"solutionMetadataTable",
    "Band Definition ":"bandDefinitionTable"
  };
  
  export const allowedExtensions = [".csv", ".xls", ".xlsx"];
 
export const fileTypes = Object.keys(fileUploadKeyMap); // display keys
export const fileValues = Object.values(fileUploadKeyMap);