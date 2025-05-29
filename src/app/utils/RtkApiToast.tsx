import { AppDispatch } from '@/store/store';
import { showToast, hideToast } from '@/components/Toaster/toasterSlice';

export interface rtkInbuilt {
  data: {
    success: boolean;
    message: string;
    error?: string;
    accessToken: string;
  };
}

export async function rtkAPIToast<T>(
  queryFulfilled: Promise<T>,
  dispatch: AppDispatch,
  {
    successMessage,
    errorMessage,
    duration = 5000,
  }: {
    successMessage: string;
    errorMessage?: string;
    duration?: number;
  },
) {
  try {
    const result = (await queryFulfilled) as rtkInbuilt;
    const { message, error } = result.data;

    const dynamicMessage = message || successMessage;

    dispatch(showToast({ message: dynamicMessage, severity: 'success' }));
  } catch (error: any) {
    dispatch(
      showToast({
        message: error?.error?.data?.message || errorMessage || 'Something went wrong!',
        severity: 'error',
      }),
    );
  } finally {
    setTimeout(() => {
      dispatch(hideToast());
    }, duration);
  }
}
