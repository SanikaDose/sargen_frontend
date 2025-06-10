export interface LoaderProps {
  loading: boolean;
  backdrop?: boolean;
  backdropColor?: string; // <-- Add this
  size?: number;
  color?: 'primary' | 'secondary' | 'inherit' | 'error' | 'info' | 'success' | 'warning';
  thickness?: number;
  className?: string;
}
