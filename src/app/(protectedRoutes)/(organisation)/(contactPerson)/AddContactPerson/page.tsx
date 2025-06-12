import OnboardingLayout from '@/components/Layout/onboardingLayout';
import ContactPersonForm from '../ContactPersonForm';

const AddContactPersonPage = () => {
  return (
    <OnboardingLayout>
      <ContactPersonForm
        firstName={''}
        lastName={''}
        employeeId={''}
        email={''}
        country={''}
        designation={''}
        contactNumber={''}
        tenantId={''}
      />
    </OnboardingLayout>
  );
};

export default AddContactPersonPage;
