import { useEffect, useState } from 'react';
import { useAddCostCategoriesMutation, useGetCostCategoriesMutation } from '../../plantAssementApi';
import { useParams } from 'next/navigation';
import { CostInputPercentage, FormValues, MultipleSections, RawCostCategory } from '../../plantAssement.model';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form';
import styles from './costProfile.module.css';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import OverallCostProfileCard from '@/components/CostProfileCard/OverallCostProfileCard';
import InfoBox from '@/components/InfoBox/InfoBox';

const CostProfile = ({ handleOptionSelected }: MultipleSections) => {
  const path = useParams() as { plantAssessment?: string[] };

  console.log('plantAssessment', path);

  const tenantId = getValueLocalStorage('tenantId');
  const [getCostCategories] = useGetCostCategoriesMutation();
  const [addCostCategories] = useAddCostCategoriesMutation();

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { costs: [] },
  });

  const formValues = useWatch({
    control,
    name: 'costs',
  });

  // Calculate average percentage
  const averagePercentage =
    formValues && formValues.length > 0
      ? (
          formValues.reduce((acc, item) => acc + parseFloat(String(item.costAsAPercentageOfRevenue || 0)), 0) /
          formValues.length
        ).toFixed(2)
      : '0.00';

  const { fields, replace } = useFieldArray({
    control,
    name: 'costs',
  });

  const fetchCostProfileData = async () => {
    if (!path.plantAssessment || path.plantAssessment.length < 3) return;

    const payload = {
      tenantId,
      plantId: path.plantAssessment[2],
    };

    try {
      const result = await getCostCategories(payload).unwrap();

      const formattedData = result.map((item: RawCostCategory) => ({
        id: item.id,
        costCategory: item.costCategory.trim(),
        costAsAPercentageOfRevenue: parseFloat(item.costAsAPercentageOfRevenue) || 0,
      }));

      replace(formattedData);
    } catch (error) {
      console.error('Failed to fetch cost categories', error);
    }
  };

  const handleFormSubmit = async (data: FormValues) => {
    if (!path.plantAssessment || path.plantAssessment.length < 3) return;

    const payload = {
      tenantId,
      plantId: path.plantAssessment[2],
      costProfileData: data.costs.map((cost) => ({
        id: cost.id,
        costCategory: cost.costCategory,
        costAsAPercentageOfRevenue: parseFloat(String(cost.costAsAPercentageOfRevenue)),
      })),
    };

    await addCostCategories(payload).unwrap();
    handleOptionSelected('KPI Selection');
  };

  useEffect(() => {
    fetchCostProfileData();
  }, [path.plantAssessment]);

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} className={styles.formContainer}>
        <Typography variant="h6" sx={{ color: 'black', textAlign: 'left', width: '100%' }}>
          Cost Profile
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{ height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}
        >
          {fields.length > 0
            ? fields.map((field, index) => (
                <Grid size={{ xs: 8, sm: 8, md: 6, lg: 5, xl: 5 }} key={field.id} sx={{ height: '12%' }}>
                  <Controller
                    name={`costs.${index}.costAsAPercentageOfRevenue`}
                    control={control}
                    render={({ field: controllerField }) => (
                      <OverallCostProfileCard
                        fieldName={field.costCategory}
                        costValue={controllerField.value}
                        onChange={(val) => controllerField.onChange(val)}
                        readonly={false}
                      />
                    )}
                  />
                </Grid>
              ))
            : 'No cost Profile'}
        </Grid>

        <Box sx={{ height: '15%', width: '35%' }}>
          <OverallCostProfileCard
            fieldName="Overall Cost Profile"
            costValue={averagePercentage}
            onChange={() => {}}
            readonly
            boxBackgroundColor="#10557C"
          />
        </Box>

        {/* <Box mt={4} display="flex" justifyContent="center">
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box> */}
      </Box>

      <Box className={styles.aboutSection}>
        <InfoBox
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac nulla arcu. Nam accumsan vel lectus nec ullamcorper. Sed euismod ultrices velit, nec dignissim tortor aliquam eu. Praesent volutpat tortor a mi molestie blandit. Nulla euismod tortor a luctus maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse odio enim, ullamcorper ornare egestas in, tristique non velit. Sed molestie felis id quam cursus elementum. Curabitur lectus sapien, placerat vel nulla ut, euismod rhoncus nulla. Sed convallis vulputate purus, at varius nisl efficitur cursus. Pellentesque tincidunt, velit id vulputate semper, felis augue scelerisque ipsum, a tincidunt sapien lacus at leo. Etiam fringilla elit velit, nec mattis orci fermentum ut. In ut sapien ut ipsum posuere faucibus sit amet malesuada metus. Donec volutpat magna sed molestie placerat."
          heading="About Industry"
        />
      </Box>
    </>
  );
};

export default CostProfile;
