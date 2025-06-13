// FileActionButton.types.ts
export interface FileActionButtonProps {
  icon?: 'upload' | 'download' | 'view';
  label?: string;
  showIcon?: boolean;
  showLabel?: boolean;
  width?: string;
  height?: string;
  variant?: 'text' | 'outlined' | 'contained';
  color?: string;
  onClick?: () => void;
  loading: boolean;
}
