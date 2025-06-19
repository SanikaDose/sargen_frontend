// components/PopupModal/PopupModal.types.ts
export interface PopupModalProps {
  label: string;
  text: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}
