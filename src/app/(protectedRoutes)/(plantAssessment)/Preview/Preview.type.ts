export interface ModeChangeEvent {
  target: EventTarget & { value: string };
}

export type JustificationMode = 'text' | 'record';
