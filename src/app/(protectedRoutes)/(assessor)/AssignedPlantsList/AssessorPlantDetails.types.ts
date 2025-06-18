export type AssessorPlantData = {
  plantName: string;
  plantId: string;
  organisationId: string;
  organisationName: string;
  assesorCompletionStage: string;
  createdAt: string;
  updatedAt: string;
};

export interface AssessorPlantDataProps {
  data?: AssessorPlantData;
  editPlantOnClick?: () => void;
  viewPlantOnClick?: () => void;
  onClick?: () => void;
}
