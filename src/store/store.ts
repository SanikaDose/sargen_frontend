// import plantAssessmentReducer from '@/app/(protectedRoutes)/(plantAssessment)/plantAssementSlice';
import plantAssessmentReducer from '@/app/(protectedRoutes)/(plantAssessment)/plantAssementSlice';
import { configureStore } from '@reduxjs/toolkit';
import { protectedApi } from './api/protectedApis/baseProtectedApi';
import { publicApi } from './api/publicApis/basePublicApi';

import languageReducer from './languageSlice';
export const store = configureStore({
  reducer: {
    [protectedApi.reducerPath]: protectedApi.reducer,
    [publicApi.reducerPath]: publicApi.reducer,
    plantAssessmentGlobal: plantAssessmentReducer,
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(protectedApi.middleware).concat(publicApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
