// src/app/(protectedRoutes)/(organization)/page.tsx

'use client';
import { pagesNames } from '@/constants/pagesHeaderNames';
import { setPageNameHeader } from '@/store/globalSlice';
import { useDispatch } from 'react-redux';
import OrganisationOnboarding from './OrganisationOnboarding';

const OrganizationPage = () => {
  const dispatch = useDispatch();
  dispatch(setPageNameHeader(pagesNames.organisationOnboardingInfo));
  return <OrganisationOnboarding />;
};

export default OrganizationPage;
