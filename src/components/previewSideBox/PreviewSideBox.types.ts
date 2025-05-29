export interface Props {
  questions: { section: string; questionNo: number; status: string }[];
  selected?: { section: string; questionNo: number } | null;
  onSelect: (q: { section: string; questionNo: number }) => void;
}
