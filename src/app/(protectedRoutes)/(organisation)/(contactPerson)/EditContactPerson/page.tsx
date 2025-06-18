import React from 'react';
import ContactPersonForm from '../ContactPersonForm';

const EditContactPersonPage = () => {
  return (
    <ContactPersonForm
      editMode={true}
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

export default EditContactPersonPage;
