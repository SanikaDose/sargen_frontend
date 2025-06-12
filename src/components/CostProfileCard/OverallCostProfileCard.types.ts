export interface OverallCostProfileCardProps {
  fieldName: string;
  costValue: string | number;
  onChange?: (newValue: string) => void;
  boxBackgroundColor?: string;
  textColor?: string;
  readonly: boolean;
}
