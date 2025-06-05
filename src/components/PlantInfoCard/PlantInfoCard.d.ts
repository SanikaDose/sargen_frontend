export interface PlantData {
  name: string;
  plantLogo: string;
  location: string;
  registrationNo: string;
  age: number;
  gstin: string;
  revenue: string;
  numberOfEmployees: number;
  numberOfLines: number;
  createdAt: string;
  updatedAt: string;
  assessmentStartDate: string;
  debriefDate: string;
  assessmentCompletionPercentage: number;
}

export interface PlantInfoCardProps {
  data?: PlantData;
  editPlantOnClick?: () => void;
  onClick?: () => void;
}
