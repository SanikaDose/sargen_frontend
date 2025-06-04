'use client';

import { Box, Grid, Typography, FormControl, Select, MenuItem } from '@mui/material';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import ImageUploader from '@/components/ImageUpload/ImageUpload';
import defaultUserLogo from './../../../../../public/images/default-logo-image.png';
import Stepper from '@/components/Stepper/Stepper';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { useState, useEffect } from 'react';
import { ContactPersonFormProps, PocPayload } from './ContactPerson.types';
import {
  useAddPointOfContactMutation,
  useGetPointOfContactQuery,
  useUploadPocProfilePicMutation,
} from './ContactPersonApi';
import styles from './ContactPerson.module.css';
import { CountryOptions } from '@/app/utils/CountryOptions';
import { useRouter } from 'next/navigation';

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

  const router = useRouter();
  const [profilePicUrl, setProfilePicUrl] = useState<string>(defaultUserLogo.src);
  const [uploadPocProfilePic] = useUploadPocProfilePicMutation();
  const [submitPointOfContact, { isLoading }] = useAddPointOfContactMutation();
  const { data: existingData, isLoading: isFetching } = useGetPointOfContactQuery(tenantId, {
    skip: !editMode,
  });
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (editMode && existingData) {
      setFormData((prev) => ({
        ...prev,
        ...existingData,
      }));
    }
  }, [editMode, existingData]);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await uploadPocProfilePic({ tenantId, formData }).unwrap();
      const localUrl = URL.createObjectURL(file);
      setProfilePicUrl(localUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldIndex = steps.findIndex((s) => s.label.toLowerCase().replace(/ /g, '') === name.toLowerCase());
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      if (value.trim() && !completedSteps.includes(fieldIndex)) {
        setCompletedSteps((prev) => [...prev, fieldIndex]);
      } else if (!value.trim() && completedSteps.includes(fieldIndex)) {
        setCompletedSteps((prev) => prev.filter((step) => step !== fieldIndex));
      }

      return newData;
    });
  };

  const handleFocus = (e: { target: { name: string } }) => {
    const { name } = e.target;
    const index = steps.findIndex((s) => s.name === name);
    setActiveStep(index);
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

  const isFormValid = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.employeeId.trim() &&
      formData.email.trim() &&
      formData.country.trim() &&
      formData.designation.trim() &&
      formData.contactNumber.trim() &&
      (formData.jobRole ?? '').trim()
    );
  };

  const steps = [
    { label: 'First Name', name: 'firstName' },
    { label: 'Last Name', name: 'lastName' },
    { label: 'Employee ID', name: 'employeeId' },
    { label: 'Email', name: 'email' },
    { label: 'Country', name: 'country' },
    { label: 'Designation', name: 'designation' },
    { label: 'Contact', name: 'contactNumber' },
    { label: 'Job Role', name: 'jobRole' },
  ];

  if (editMode && isFetching) {
    return (
      <Typography ml={2} mt={2}>
        Loading contact data...
      </Typography>
    );
  }

  return (
    <form>
      <Grid className={styles.stepperContainer}>
        <Stepper steps={steps} activeStep={activeStep} completedSteps={completedSteps} />
      </Grid>
      <Grid>
        <Typography variant="h5" fontSize={20} component="h5" fontWeight="bold" ml={2}>
          User Profile
        </Typography>
        <Grid className={styles.formContainer}>
          <Box className={styles.imageBox}>
            <ImageUploader imageProp={profilePicUrl} onUpload={handleUpload} />
          </Box>
          <Box className={styles.formFieldsBox}>
            <Grid container spacing={1}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InputWithLabel
                  label="First name"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  sx={textFieldStyles}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InputWithLabel
                  label="Last Name"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  sx={textFieldStyles}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <InputWithLabel
                  label="Employee ID"
                  name="employeeId"
                  placeholder="Enter Employee ID"
                  value={formData.employeeId}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  sx={textFieldStyles}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InputWithLabel
                  label="E-mail"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  sx={textFieldStyles}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, color: '#000000' }}>
                    Country <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <Select
                    displayEmpty
                    value={formData.country}
                    onChange={(e) => {
                      const value = e.target.value;
                      const name = 'country';
                      const fieldIndex = steps.findIndex((s) => s.name === name);
                      setFormData((prev) => ({
                        ...prev,
                        [name]: value,
                      }));
                      if (value.trim() && !completedSteps.includes(fieldIndex)) {
                        setCompletedSteps((prev) => [...prev, fieldIndex]);
                      } else if (!value.trim() && completedSteps.includes(fieldIndex)) {
                        setCompletedSteps((prev) => prev.filter((step) => step !== fieldIndex));
                      }
                    }}
                    inputProps={{ name: 'country', 'aria-label': 'Select Country' }}
                    sx={{ borderRadius: '8px' }}
                    onOpen={() => handleFocus({ target: { name: 'country' } } as { target: { name: string } })}
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
              <Grid size={{ xs: 12, sm: 6 }}>
                <InputWithLabel
                  label="Designation"
                  name="designation"
                  placeholder="Enter Designation"
                  value={formData.designation}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  sx={textFieldStyles}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InputWithLabel
                  label="Contact Number"
                  name="contactNumber"
                  placeholder="Enter Contact Number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  sx={textFieldStyles}
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid ml={5} mr={5}>
          <InputWithLabel
            label="Job Role"
            name="jobRole"
            placeholder="Specify Job Role"
            multiline
            rows={4}
            value={formData.jobRole}
            onChange={handleChange}
            onFocus={handleFocus}
            sx={textFieldStyles}
            required
          />
        </Grid>
      </Grid>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={1}
        mt={1}
        ml={5}
        mr={5}
        sx={{ background: '#F5FAFD', height: '70px', borderRadius: '8px' }}
      >
        <CustomButton
          variant="contained"
          icon="left"
          color="#10557C"
          onClick={() => router.push('/organisationOnboarding')}
        >
          Back
        </CustomButton>
        <CustomButton
          variant="contained"
          icon="save"
          color="#10557C"
          onClick={handleSubmit}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </CustomButton>
      </Box>
    </form>
  );
};

export default ContactPersonForm;
