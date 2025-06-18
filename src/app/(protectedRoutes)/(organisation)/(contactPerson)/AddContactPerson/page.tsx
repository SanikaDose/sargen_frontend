import ContactPersonForm from '../ContactPersonForm';

const AddContactPersonPage = () => {
  return (
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
  );
};

export default AddContactPersonPage;
