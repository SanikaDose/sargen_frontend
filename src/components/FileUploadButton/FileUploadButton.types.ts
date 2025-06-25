import { ButtonProps } from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';

export interface FileUploadButtonProps {
  onFileSelect?: (file: File) => void;
  label?: string;
  size?: ButtonProps['size'];
  accept?: string;
  iconSize?: string;
  buttonVariant?: ButtonProps['variant'];
  buttonColor?: ButtonProps['color'];
  sx?: SxProps<Theme>;
}
