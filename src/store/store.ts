import plantAssessmentReducer from '@/app/(protectedRoutes)/(plantAssessment)/plantAssementSlice';
import LoginReducer from '@/app/(unprotectedRoutes)/login/loginSlice';
import { configureStore } from '@reduxjs/toolkit';
import { protectedApi } from './api/protectedApis/baseProtectedApi';
import { publicApi } from './api/publicApis/basePublicApi';
import globalReducer from './globalSlice';
import toasterReducer from "../components/toaster/toasterSlice"

import languageReducer from './languageSlice';
export const store = configureStore({
  reducer: {
    global: globalReducer,
    toasterGlobal: toasterReducer,
    [protectedApi.reducerPath]: protectedApi.reducer,
    [publicApi.reducerPath]: publicApi.reducer,
    plantAssessmentGlobal: plantAssessmentReducer,
    language: languageReducer,
    tokenDecode: LoginReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(protectedApi.middleware).concat(publicApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
