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
  
  export const fileTypes = Object.keys(fileUploadKeyMap);