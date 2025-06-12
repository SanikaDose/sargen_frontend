'use client';

import { useStepper } from '@/store/useStepper';
import { useEffect } from 'react';
import { GlobalStepper } from '@/components/Stepper/GlobalStepper';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const { initSteps, show } = useStepper();

  useEffect(() => {
    initSteps([
      { label: 'Organisation Onboarding', path: '/organisationOnboarding' },
      { label: 'Contact Person', path: '/AddContactPerson' },
    ]);
    show();
  }, []);

  return (
    <>
      <GlobalStepper />
      {children}
    </>
  );
}
