import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Grid, Typography } from '@mui/material';
import Stepper from '@/components/Stepper/Stepper';
import ImageUploader from '@/components/ImageUpload/ImageUpload';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { Dropdown } from '@/components/Dropdown/Dropdown';

function OrganizationOnbording() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      website: '',
      gstin: '',
      country: '',
      TotalRevenue: '',
      uom: '',
      numberEmp: '',
      OrgDetails: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
  };

  const onError = (errors: any) => {
    console.error('Validation Errors:', errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* Stepper */}
      <Grid sx={{ borderRadius: '15px', padding: 1, height: { xs: 'auto', sm: '10%', md: '11%' } }}>
        <Stepper
          steps={[
            { label: 'Logo' },
            { label: 'Name' },
            { label: 'Website' },
            { label: 'GST IN' },
            { label: 'Revenue' },
            { label: 'No. of Employee' },
          ]}
        />
      </Grid>

      <Grid sx={{ height: '3%' }}>
        <Typography variant="h6">Organization Details</Typography>
      </Grid>

      {/* Image + Fields */}
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 1,
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {/* Image Upload */}
        <Box sx={{ display: 'flex', width: '27%', justifyContent: 'center', alignItems: 'center' }}>
          <ImageUploader imageProp="/images/default-logo-image.png?ignore" />
        </Box>

        {/* Inputs */}
        <Grid size={{ md: 7, xs: 12, lg: 8 }}>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Company name is required' }}
            render={({ field }) => (
              <InputWithLabel label="Name of the company" placeholder="Enter Name of the company" {...field} />
            )}
          />

          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <InputWithLabel label="Company Website" placeholder="Enter company website" {...field} required={true} />
            )}
          />

          <Grid container spacing={{ xs: 0, md: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="gstin"
                control={control}
                render={({ field }) => (
                  <InputWithLabel type="text" label="GST In Details" placeholder="Enter GST IN no" {...field} />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '13px', mb: '1px', mt: 2, ml: '5px' }}>
                Country
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  '& .MuiFormControl-root': {
                    mt: 0,
                  },
                  '& .MuiOutlinedInput-root': {
                    height: '40px',
                    color: '#888',
                  },
                  sm: { width: '100%' },
                }}
              >
                <Controller
                  name="country"
                  control={control}
                  //   rules={{ required: 'Country is required' }}
                  render={({ field }) => (
                    <Dropdown
                      {...field}
                      options={['India', 'United States', 'Canada', 'Germany']}
                      placeholder="Select From Dropdown"
                      multiSelect={false}
                    />
                  )}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Revenue Section */}
      <Grid container spacing={{ xs: 0, md: 1 }} sx={{ px: 1 }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Controller
            name="TotalRevenue"
            control={control}
            render={({ field }) => (
              <InputWithLabel label="Organization Revenue" placeholder="Enter Total Revenue" {...field} />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <Controller
            name="uom"
            control={control}
            render={({ field }) => <InputWithLabel label="UOM" placeholder="UOM" {...field} />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Controller
            name="numberEmp"
            control={control}
            render={({ field }) => (
              <InputWithLabel label="Number Of Employee" placeholder="Enter Total no" {...field} />
            )}
          />
        </Grid>
      </Grid>

      {/* About Org */}
      <Grid sx={{ px: 1 }}>
        <Controller
          name="OrgDetails"
          control={control}
          render={({ field }) => (
            <InputWithLabel
              label="About Organization"
              type="text"
              placeholder="Enter Organization Details"
              multiline
              rows={3}
              {...field}
            />
          )}
        />
      </Grid>

      {/* Buttons */}
      <Grid
        container
        justifyContent="space-between"
        sx={{ p: 1, borderRadius: 4, backgroundColor: '#B0E0E6', border: '1px solid purple' }}
      >
        <Grid>
          <CustomButton children="Back" variant="contained" color="#10557C" icon="left" height="55px" width="80px" />
        </Grid>
        <Grid>
          <CustomButton
            children="Next"
            variant="contained"
            color="#10557C"
            icon="right"
            height="55px"
            width="80px"
            type="submit"
          />
        </Grid>
      </Grid>
    </form>
  );
}

export default OrganizationOnbording;
