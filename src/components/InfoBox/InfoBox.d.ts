// export interface InfoBoxProps {
//   heading?: string;
//   content?: string;
//   className?: string;
//   style?: React.CSSProperties;
// }

export interface InfoBoxProps {
  heading?: string;
  content?: string;
  className?: string;
  sx?: React.ComponentProps<typeof Box>['sx'];
}
