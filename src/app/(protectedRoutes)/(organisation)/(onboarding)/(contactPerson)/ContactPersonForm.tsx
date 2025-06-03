'use client';

import { Box, Grid, Typography, FormControl, Select, MenuItem } from '@mui/material';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import ImageUploader from '@/components/ImageUpload/ImageUpload';
import Stepper from '@/components/Stepper/Stepper';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { useState, useEffect } from 'react';
import { CountryOptions, PocPayload } from './ContactPerson.types';
import { useAddPointOfContactMutation, useGetPointOfContactQuery } from './ContactPersonApi';

interface ContactPersonFormProps {
  tenantId: string;
  editMode?: boolean;
}

const ContactPersonForm = ({ tenantId, editMode = false }: ContactPersonFormProps) => {
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

  const [submitPointOfContact, { isLoading }] = useAddPointOfContactMutation();
  const { data: existingData, isLoading: isFetching } = useGetPointOfContactQuery(tenantId, {
    skip: !editMode,
  });

  useEffect(() => {
    if (editMode && existingData) {
      console.log('Setting formData with:', existingData);
      setFormData((prev) => ({
        ...prev,
        ...existingData,
      }));
    }
  }, [editMode, existingData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    'Contact',
    'Job Role',
  ].map((label) => ({ label }));

  if (editMode && isFetching) {
    return (
      <Typography ml={2} mt={2}>
        Loading contact data...
      </Typography>
    );
  }

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
                    value={formData.firstName || ''}
                    onChange={handleChange}
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid size={6}>
                  <InputWithLabel
                    label="Last Name"
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={formData.lastName || ''}
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
                  value={formData.employeeId || ''}
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
                    value={formData.email || ''}
                    onChange={handleChange}
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid size={6}>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <Typography sx={{ fontWeight: 500, color: '#000000' }}>Country</Typography>
                    <Select
                      displayEmpty
                      value={formData.country || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          country: e.target.value,
                        }))
                      }
                      inputProps={{ 'aria-label': 'Select Country' }}
                      sx={{ borderRadius: '8px' }}
                    >
                      <MenuItem value="" sx={{ fontStyle: 'italic', color: 'gray' }}>
                        <em>Select Country</em>
                      </MenuItem>
                      {CountryOptions.map((country) => (
                        <MenuItem key={country.code} value={country.name}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <InputWithLabel
                    label="Designation"
                    name="designation"
                    placeholder="Enter Designation"
                    value={formData.designation || ''}
                    onChange={handleChange}
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid size={6}>
                  <InputWithLabel
                    label="Contact Number"
                    name="contactNumber"
                    placeholder="Enter Contact Number"
                    value={formData.contactNumber || ''}
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
            value={formData.jobRole || ''}
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
          {isLoading ? 'Saving...' : editMode ? 'Update' : 'Save'}
        </CustomButton>
      </Box>
    </>
  );
};

export default ContactPersonForm;
