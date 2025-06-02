import { configureStore } from '@reduxjs/toolkit';
import { protectedApi } from './api/protectedApis/baseProtectedApi';
import { publicApi } from './api/publicApis/basePublicApi';

export const store = configureStore({
  reducer: {
    // add more slices here
    [protectedApi.reducerPath]: protectedApi.reducer,
    [publicApi.reducerPath]: publicApi.reducer,
  },
});

// Types for use in your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
