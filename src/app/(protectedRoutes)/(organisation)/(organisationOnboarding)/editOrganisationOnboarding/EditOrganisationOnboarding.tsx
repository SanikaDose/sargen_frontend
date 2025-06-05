import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Grid, Typography } from '@mui/material';
import Stepper from '@/components/Stepper/Stepper';
import ImageUploader from '@/components/ImageUpload/ImageUpload';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import {
  useSubmitOrganizationInfoMutation,
  useUploadOrganizationLogoMutation,
  useGetOrganizationInfoQuery,
} from './EditOrganisationOnboardingApi';
import { useRouter } from 'next/navigation';
import { MenuItem, FormControl, OutlinedInput, Select } from '@mui/material';
import { CountryOptions } from '@/app/utils/CountryOptions';
function OrganizationOnbording() {
  const router = useRouter();
  const [submitOrganizationInfo, { isLoading, isSuccess, isError }] = useSubmitOrganizationInfoMutation();
  const [uploadOrganizationLogo] = useUploadOrganizationLogoMutation();
  const [logoUrl, setLogoUrl] = useState<string>('/images/default-logo-image.png?ignore');
  const tenantId = 'mayuri-Corp-5baeb801-9a20-4e6b-b842-110f74db41c0';
  // const tenantId = 'mayuri-Corp-5baeb801-9a20-4e6b-b842-110f74db41c0';

  // ✅ Fetch organization info
  const { data } = useGetOrganizationInfoQuery(tenantId, {
    skip: !tenantId,
  });

  console.log('if we have tenentid the we get this data', data);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: '',
      website: '',
      gstin: '',
      country: '',
      revenue: '',
      uom: '',
      numberOfEmployees: '',
      about: '',
    },
  });

  // ✅ Pre-fill form once data is loaded
  useEffect(() => {
  if (data?.data) {
    const org = data.data;
    reset({
      companyName: org.name || '',
      website: org.website || '',
      gstin: org.gstin || '',
      country: org.country || '',
      revenue: org.revenue || '',
      uom: org.uom || '',
      numberOfEmployees: org.numberOfEmployees || '',
      about: org.about || '',
    });
    // Set logo if available
    if (org.userLogo) {
      setLogoUrl(org.userLogo);
    }
  }
}, [data, reset]);

  //hnadle organization logo
  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await uploadOrganizationLogo({ tenantId, formData }).unwrap();
      const localUrl = URL.createObjectURL(file);
      setLogoUrl(localUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  //on form submit
  const onSubmit = async (data: any) => {
    console.log('country value', data.country);
    console.log('Form Data:', data);
    try {
      await submitOrganizationInfo({ tenantId, body: data }).unwrap();
      console.log('Organization info submitted'); //use toster
      router.push('/AddContactPerson');
    } catch (error) {
      console.log('api submition failed', error);
    }
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
          <ImageUploader imageProp={logoUrl} onUpload={handleUpload} />
        </Box>

        {/* Inputs */}
        <Grid size={{ md: 7, xs: 12, lg: 8 }}>
          <Controller
            name="companyName"
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
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '16px', mt: 2, ml: '5px' }}>
                Country
              </Typography>
              <FormControl fullWidth sx={{ mt: 0 }}>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: 'Country is required' }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      displayEmpty
                      input={<OutlinedInput />}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value)}
                      sx={{
                        height: '55px',
                        color: '#888',
                        width: '100%',
                      }}
                      renderValue={(selected) => {
                        if (!selected) return <em style={{ color: '#888' }}>Select From Dropdown</em>;
                        return selected;
                      }}
                    >
                      <MenuItem disabled value="">
                        <em>Select From Dropdown</em>
                      </MenuItem>
                      {/* {['India', 'United States', 'Canada', 'Germany'].map((country) => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      ))} */}

                      {CountryOptions.map((country) => (
                        <MenuItem key={country.code} value={country.name}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Revenue Section */}
      <Grid container spacing={{ xs: 0, md: 1 }} sx={{ px: 1 }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Controller
            name="revenue"
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
            name="numberOfEmployees"
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
          name="about"
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
        sx={{ p: 0.5, borderRadius: 4, backgroundColor: '#B0E0E6', border: '1px solid purple' }}
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
