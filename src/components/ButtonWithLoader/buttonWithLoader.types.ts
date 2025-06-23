export interface ButtonWithLoaderProps {
  label: string;
  onClick?: () => void;
  loading?: boolean;
  loaderSize?: number;
  loaderThickness?: number;
  loaderColor?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'text' | 'outlined' | 'contained';
  className?: string;
}
