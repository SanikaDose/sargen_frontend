import { store } from '@/store/store';
import { showToast } from '@/components/toaster/toasterSlice';

/**
 * Utility to trigger global toast notifications without needing `useDispatch`.
 *
 * @param message - The message to display in the toast
 * @param severity - The alert severity type ('success' | 'info' | 'warning' | 'error')
 */
export function triggerToast(
  message: string,
  severity: 'success' | 'info' | 'warning' | 'error' = 'success'
): void {
  store.dispatch(showToast({ message, severity }));
}
