'use client';

import { Box, Grid, Typography } from '@mui/material';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import ImageUploader from '@/components/ImageUpload/ImageUpload';
import Stepper from '@/components/Stepper/Stepper';
import { CustomButton } from '@/components/CustomButton/CustomButton';

const ContactPersonForm = () => {
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
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid size={6}>
                  <InputWithLabel
                    label="Last Name"
                    name="lastName"
                    placeholder="Enter Last Name"
                    sx={textFieldStyles}
                  />
                </Grid>
              </Grid>
              <Box>
                <InputWithLabel
                  label="Employee ID"
                  name="employeeId"
                  placeholder="Enter Employee ID"
                  sx={textFieldStyles}
                />
              </Box>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <InputWithLabel label="E-mail" name="email" placeholder="Enter Email" sx={textFieldStyles} />
                </Grid>
                <Grid size={6}>
                  <InputWithLabel label="Country" name="country" placeholder="Enter Country" sx={textFieldStyles} />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <InputWithLabel
                    label="Designation"
                    name="designation"
                    placeholder="Enter Designation"
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid size={6}>
                  <InputWithLabel
                    label="Contact Number"
                    name="contactNumber"
                    placeholder="Enter Contact Number"
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

        <CustomButton variant="contained" icon="success" color="#10557C">
          Save
        </CustomButton>
      </Box>
    </>
  );
};

export default ContactPersonForm;
