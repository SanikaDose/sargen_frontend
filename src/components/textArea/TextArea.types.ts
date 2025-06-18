export interface TextAreaProps {
  value: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  toolbar?: 'full';
  className?: string;
  style?: React.CSSProperties;
}
