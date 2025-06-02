'use client';

import { store } from '@/store/store';
import { Provider } from 'react-redux';

export default function GlobalReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
