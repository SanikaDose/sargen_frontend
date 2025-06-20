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
  assesmentStatus?: any;
}

export interface PlantInfoCardProps {
  data?: PlantData;
  editPlantOnClick?: () => void;
  viewPlantOnClick?: () => void;
  onClick?: () => void;
  assesmentStatus?: any;
}
