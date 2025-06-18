import React, { useEffect, useMemo, useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
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
import { currencyOptions } from '@/app/utils/CurrencyOptions';
import { OrgFormInputs } from '@/app/(protectedRoutes)/(organisation)/(organisationOnboarding)/organisationOnboarding/FormConfig/formInputStep';
import { OrgOnboard } from './EditOrganisationOnboarding.types';
import { triggerToast } from '@/app/utils/toast';

const steps = [
  'Company Name',
  'Company website',
  'GST In',
  'Country',
  'Organization Revenue',
  'Currency Type',
  'Number of Employees',
  'About Organization',
].map((label) => ({ label }));
function OrganizationOnbording() {
  const router = useRouter();
  const [submitOrganizationInfo, { isLoading, isSuccess, isError }] = useSubmitOrganizationInfoMutation();
  const [uploadOrganizationLogo] = useUploadOrganizationLogoMutation();
  const [logoUrl, setLogoUrl] = useState<string>('/images/default-avatar-profile.png?ignore');
  const tenantId = 'mayuri-Corp-5baeb801-9a20-4e6b-b842-110f74db41c0';

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
      triggerToast('Failed to add  upload image:', 'error');
    }
  };

  //on form submit
  const onSubmit = async (data: any) => {
    try {
      await submitOrganizationInfo({ tenantId, body: data }).unwrap();
      router.push('/AddContactPerson');
      triggerToast('Organization info submitted', 'success');
    } catch (error) {
      triggerToast('Failed to add plant info ', 'error');
    }
  };

  const onError = (errors: any) => {
    console.error('Validation Errors:', errors);
  };
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const watchedValues = useWatch({ control });

  // this is an spread operator to get the values of the form inputs (mainly for about section)
  const allInputs = [...OrgFormInputs];

  // ✅ Compute activeStep based on focused field index
  const activeStep = useMemo(() => {
    const index = allInputs.findIndex((input) => input.name === focusedField);
    return index !== -1 ? index : 0;
  }, [focusedField]);

  // ✅ Compute completed steps where value length > 5
  const completedSteps = useMemo(() => {
    return allInputs.reduce((acc: number[], input, index) => {
      const value = watchedValues?.[input.name as keyof OrgOnboard];
      if (typeof value === 'string' && value.length > 1) {
        acc.push(index);
      }
      return acc;
    }, []);
  }, [watchedValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* Stepper */}
      <Grid sx={{ borderRadius: '15px', padding: 1, height: { xs: 'auto', sm: '10%', md: '11%' } }}>
        <Stepper steps={steps} activeStep={activeStep} completedSteps={completedSteps} />
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
          gap: 1,
          px: 1,
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {/* Image Upload */}
        <Box sx={{ display: 'flex', width: '27%', justifyContent: 'center', alignItems: 'center' }}>
          <ImageUploader imageProp={logoUrl} onUpload={handleUpload} />
        </Box>
        {/* Inputs */}

        <Grid container spacing={2}>
          {/* Row 1 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name="companyName"
              control={control}
              rules={{ required: 'Company name is required' }}
              render={({ field }) => (
                <InputWithLabel
                  label="Name of the company"
                  placeholder="Enter Name of the company"
                  {...field}
                  onFocus={() => setFocusedField('companyName')}
                  error={!!errors.companyName}
                  helperText={errors.companyName?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name="website"
              control={control}
              rules={{
                required: 'Website is required',
                pattern: {
                  value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/,
                  message: 'Enter a valid URL',
                },
              }}
              render={({ field }) => (
                <InputWithLabel
                  label="Company Website"
                  placeholder="Enter company website"
                  {...field}
                  onFocus={() => setFocusedField('website')}
                  error={!!errors.website}
                  helperText={errors.website?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name="gstin"
              control={control}
              rules={{
                required: 'Gstin is required',
                pattern: {
                  value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                  message: 'Enter valid GSTIN',
                },
              }}
              render={({ field }) => (
                <InputWithLabel
                  type="text"
                  label="GST In Details"
                  placeholder="Enter GST IN no"
                  {...field}
                  onFocus={() => setFocusedField('gstin')}
                  error={!!errors.gstin}
                  helperText={errors.gstin?.message}
                />
              )}
            />
          </Grid>

          {/* Row 2 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '14px', mt: 2 }}>
              Country
            </Typography>
            <FormControl fullWidth>
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
                    onFocus={() => setFocusedField('country')}
                    sx={{ height: '36px', color: '#888', width: '100%' }}
                    renderValue={(selected) =>
                      !selected ? <em style={{ color: '#888' }}>Select From Dropdown</em> : selected
                    }
                  >
                    <MenuItem disabled value="">
                      <em>Select From Dropdown</em>
                    </MenuItem>
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

          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name="revenue"
              control={control}
              rules={{
                required: 'Revenue is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Enter a valid number',
                },
              }}
              render={({ field }) => (
                <InputWithLabel
                  label="Organization Revenue"
                  placeholder="Enter Revenue"
                  {...field}
                  onFocus={() => setFocusedField('revenue')}
                  error={!!errors.revenue}
                  helperText={errors.revenue?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '14px', mt: 2, ml: '7px' }}>
              Currency Type
            </Typography>
            <FormControl fullWidth sx={{}}>
              <Controller
                name="uom"
                control={control}
                rules={{ required: 'Currency type is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    input={<OutlinedInput />}
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    onFocus={() => setFocusedField('uom')}
                    sx={{
                      height: '36px',
                      color: '#888',
                      width: '100%',
                    }}
                    renderValue={(selected) => {
                      if (!selected) return <em style={{ color: '#888' }}>Select Currency</em>;
                      return selected;
                    }}
                  >
                    <MenuItem disabled value="">
                      <em>Select From Dropdown</em>
                    </MenuItem>

                    {currencyOptions.map((country) => (
                      <MenuItem key={country.code} value={country.name}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          {/* Row 3 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name="numberOfEmployees"
              control={control}
              rules={{
                required: 'Number of employees is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Enter a valid number',
                },
              }}
              render={({ field }) => (
                <InputWithLabel
                  label="Number of Employees"
                  placeholder="Enter Number of Employees"
                  {...field}
                  onFocus={() => setFocusedField('numberOfEmployees')}
                  error={!!errors.numberOfEmployees}
                  helperText={errors.numberOfEmployees?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>

      <Grid sx={{ px: 1 }}>
        <Controller
          name="about"
          control={control}
          rules={{
            required: 'Number of employees is required',
          }}
          render={({ field }) => (
            <InputWithLabel
              label="About Organization"
              type="text"
              placeholder="Enter Organization Details"
              multiline
              {...field}
              onFocus={() => setFocusedField('about')}
              error={!!errors.about}
              helperText={errors.about?.message}
            />
          )}
        />
      </Grid>

      {/* Buttons */}
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
        <CustomButton variant="outlined" icon="left" color="#2D7FF9" disabled>
          Back
        </CustomButton>
        <CustomButton
          type="submit"
          variant="outlined"
          icon="right"
          color="#2D7FF9"
          //  disabled={!isValid || isLoading}
        >
          Next
        </CustomButton>
      </Box>
    </form>
  );
}

export default OrganizationOnbording;
