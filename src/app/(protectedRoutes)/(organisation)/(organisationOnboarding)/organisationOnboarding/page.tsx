// src/app/(protectedRoutes)/(organization)/page.tsx

'use client';
import OnboardingLayout from '@/components/Layout/onboardingLayout';
import OrganisationOnboarding from './OrganisationOnboarding';
const OrganizationPage = () => {
  return (
    <OnboardingLayout>
      <OrganisationOnboarding />
    </OnboardingLayout>
  );
};

export default OrganizationPage;
