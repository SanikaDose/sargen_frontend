'use client';

import { Box, Grid, Typography } from '@mui/material';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import ImageUploader from '@/components/ImageUpload/ImageUpload';
import Stepper from '@/components/Stepper/Stepper';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { useState } from 'react';
import { PocPayload } from './ContactPerson.types';
import { useSubmitPointOfContactMutation } from './ContactPersonApi';

const ContactPersonForm = () => {
  const [formData, setFormData] = useState<PocPayload>({
    firstName: '',
    lastName: '',
    employeeId: '',
    email: '',
    country: '',
    designation: '',
    contactNumber: '',
    jobRole: '',
  });

  const [submitPointOfContact, { isLoading }] = useSubmitPointOfContactMutation();

  const tenantId = 'Elansol-Technologies-Pvt.-Ltd.-f65980e8-b4dd-4f83-8db1-7ee4afbb';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await submitPointOfContact({ tenantId, body: formData }).unwrap();
      console.log('Form submitted successfully');
    } catch (err) {
      console.error('Error submitting form', err);
    }
  };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': { borderRadius: '8px' },
  };

  const steps = [
    'First Name',
    'Last Name',
    'Employee ID',
    'Email',
    'Country',
    'Designation',
    'Contact Number',
    'Job Role',
  ].map((label) => ({ label }));

  return (
    <>
      <Grid mb={2} mt={2}>
        <Stepper steps={steps} />
      </Grid>
      <Grid>
        <Typography variant="h5" fontSize={20} component="h5" fontWeight="bold" ml={2}>
          User Profile
        </Typography>
        <Grid display="flex" gap={2} alignItems="stretch" ml={2} mr={2}>
          <Box display="flex" justifyContent="center" alignItems="center" width="30%" minHeight="100%">
            <ImageUploader imageProp="./images/default-logo-image.png?ignore" />
          </Box>
          <Box flex={1} width="70%">
            <Grid spacing={1}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <InputWithLabel
                    label="First name"
                    name="firstName"
                    placeholder="Enter First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid size={6}>
                  <InputWithLabel
                    label="Last Name"
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    sx={textFieldStyles}
                  />
                </Grid>
              </Grid>
              <Box>
                <InputWithLabel
                  label="Employee ID"
                  name="employeeId"
                  placeholder="Enter Employee ID"
                  value={formData.employeeId}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              </Box>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <InputWithLabel
                    label="E-mail"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid size={6}>
                  <InputWithLabel
                    label="Country"
                    name="country"
                    placeholder="Enter Country"
                    value={formData.country}
                    onChange={handleChange}
                    sx={textFieldStyles}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <InputWithLabel
                    label="Designation"
                    name="designation"
                    placeholder="Enter Designation"
                    value={formData.designation}
                    onChange={handleChange}
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid size={6}>
                  <InputWithLabel
                    label="Contact Number"
                    name="contactNumber"
                    placeholder="Enter Contact Number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    sx={textFieldStyles}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid ml={2} mr={2}>
          <InputWithLabel
            label="Job Role"
            name="jobRole"
            placeholder="Specify Job Role"
            multiline
            rows={4}
            value={formData.jobRole}
            onChange={handleChange}
            sx={textFieldStyles}
          />
        </Grid>
      </Grid>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={1}
        mt={2}
        ml={2}
        mr={2}
        sx={{ background: '#F5FAFD', height: '70px', borderRadius: '8px' }}
      >
        <CustomButton variant="contained" icon="left" color="#10557C">
          Back
        </CustomButton>

        <CustomButton variant="contained" icon="success" color="#10557C" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </CustomButton>
      </Box>
    </>
  );
};

export default ContactPersonForm;
