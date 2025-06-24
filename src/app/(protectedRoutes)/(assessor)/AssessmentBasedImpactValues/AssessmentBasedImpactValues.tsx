'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Grid, Paper, Typography } from '@mui/material';
import styles from './AssessmentBasedImpactValues.module.css';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import InfoBox from '@/components/InfoBox/InfoBox';
import {
  useGetImpactValuesMutation,
  useGetSelectedImpactValuesMutation,
  useSelectImpactValuesMutation,
} from './AssessmentBasedImpactValuesApi';
import Card from '@/components/Card/Card';
import { useDispatch } from 'react-redux';
import { setPageNameHeader } from '@/store/globalSlice';
import { pagesNames } from '@/constants/pagesHeaderNames';
import Loader from '@/components/Loader/Loader';

const AssessmentBasedImpactValues = () => {
  const params = useParams();
  const router = useRouter();
  const tenantId = params.organisationId as string;
  const plantId = params.plantId as string;
  const [dimensionData, setDimensionData] = useState<{ dimension: string; value: number }[]>([]);
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>([]);
  const dispatch = useDispatch();
  dispatch(setPageNameHeader(pagesNames.assessorDimenasionSelection));

  // Helper function to format camelCase to Title Case
  const formatDimensionName = (name: string): string => {
    return (
      name
        // Handle sequences of uppercase letters followed by lowercase (e.g., "APercent" -> "A Percent")
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        // Insert space before uppercase letters that follow lowercase letters
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        // Insert space before numbers
        .replace(/([a-zA-Z])(\d)/g, '$1 $2')
        // Insert space after numbers before letters
        .replace(/(\d)([a-zA-Z])/g, '$1 $2')
        // Handle edge case where single uppercase letters might be stuck together
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
        // Capitalize first letter of each word
        .replace(/\b\w/g, (match) => match.toUpperCase())
        // Handle special cases for common abbreviations and articles
        .replace(/\bA\b/g, 'a')
        .replace(/\bAn\b/g, 'an')
        .replace(/\bThe\b/g, 'the')
        .replace(/\bOf\b/g, 'of')
        .replace(/\bIn\b/g, 'in')
        .replace(/\bOn\b/g, 'on')
        .replace(/\bAt\b/g, 'at')
        .replace(/\bTo\b/g, 'to')
        .replace(/\bFor\b/g, 'for')
        .replace(/\bWith\b/g, 'with')
        .replace(/\bBy\b/g, 'by')
        .replace(/\bAs\b/g, 'as')
        // Ensure first word is always capitalized
        .replace(/^[a-z]/, (match) => match.toUpperCase())
    );
  };

  const [getImpactValues, { isLoading: isGetLoading }] = useGetImpactValuesMutation();
  const [getSelectedImpactValues, { isLoading: isGetSelectLoading }] = useGetSelectedImpactValuesMutation();
  const [selectImpactValues, { isLoading: isSelectLoading }] = useSelectImpactValuesMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const impactRes = await getImpactValues({ tenantId, plantId });
        const impactObj = impactRes?.data?.[0] ?? {};
        const mappedDimensions = Object.entries(impactObj)
          .filter(([key]) => key !== 'id')
          .map(([dimension, value]) => ({ dimension, value: Number(value) }));

        setDimensionData(mappedDimensions);

        const selectedRes = await getSelectedImpactValues({ tenantId, plantId });
        const selected = selectedRes?.data
          ?.filter((item: { dimension: string; isselected: boolean }) => item.isselected)
          .map((item: { dimension: string }) => item.dimension);

        setSelectedDimensions(selected || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    if (tenantId && plantId) fetchData();
  }, [tenantId, plantId, getImpactValues, getSelectedImpactValues]);

  const toggleSelection = (dimension: string) => {
    const normalized = dimension.trim().toLowerCase();
    setSelectedDimensions((prev) => {
      const normalizedPrev = prev.map((d) => d.trim().toLowerCase());
      if (normalizedPrev.includes(normalized)) {
        return prev.filter((d) => d.trim().toLowerCase() !== normalized);
      } else if (prev.length < 4) {
        return [...prev, dimension];
      } else {
        alert('You can select only 4 impact dimensions.');
        return prev;
      }
    });
  };

  const handleSave = async () => {
    if (selectedDimensions.length !== 4) {
      alert('You must select exactly 4 impact dimensions.');
      return;
    }

    try {
      // Only send the selected dimensions
      const selectedImpactValues = selectedDimensions.map((selectedDimension) => {
        const foundDimension = dimensionData.find((d) => d.dimension === selectedDimension);
        return {
          dimension: selectedDimension,
          impactValueRating: foundDimension?.value.toString() || '0',
          isselected: true,
        };
      });

      const payload = {
        tenantId,
        plantId,
        selectedImpactValues,
      };

      const response = await selectImpactValues(payload).unwrap();

      if (response) {
        router.push(`/AssessmentSolution/${tenantId}/${plantId}`);
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('Something went wrong while saving KPI impact values.');
    }
  };

  return (
    <>
      {isGetLoading || isGetSelectLoading || isSelectLoading ? (
        <Loader loading={true} />
      ) : (
        <Box
          sx={{ height: '99%' }}
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <Paper
            className={styles.formSection}
            elevation={2}
            sx={{
              mt: 2,
              borderRadius: '16px',
              backgroundColor: 'white',
              border: '1px solid rgb(216, 216, 216)',
            }}
          >
            <Box sx={{ width: '100%', height: '100%', display: 'flex' }} className={styles.bothSections}>
              <Box className={styles.formContainer}>
                <Typography variant="h4">Assessment Based Impact Values</Typography>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 2,
                  }}
                >
                  {dimensionData.map(({ dimension, value }) => {
                    const isSelected = selectedDimensions.includes(dimension); // Direct comparison
                    return (
                      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={dimension}>
                        <Card
                          label={
                            <Box textAlign="center">
                              <Typography fontSize={'14px'} marginLeft={2}>
                                {formatDimensionName(dimension)}
                              </Typography>
                              <Typography
                                variant="body2"
                                mt={0.5}
                                color="textSecondary"
                                sx={{
                                  fontSize: '1.25rem',
                                  fontWeight: 'bold',
                                  color: 'black',
                                  textAlign: 'left',
                                  ml: 2,
                                }}
                              >
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'black', alignItems: 'start' }}>{value}</span>
                              </Typography>
                            </Box>
                          }
                          isSelected={isSelected}
                          onToggle={() => toggleSelection(dimension)}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>

              <Box className={styles.rightSection}>
                <Box className={styles.aboutSection}>
                  <InfoBox
                    content="This section evaluates impact values like vertical and horizontal integration from the assessment results."
                    heading="About Impact Values"
                  />
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  p={1}
                  mt={3}
                  ml={5}
                  mr={5}
                  sx={{ background: '#F5FAFD', height: '70px', borderRadius: '16px' }}
                  className={styles.buttonSection}
                >
                  <CustomButton variant="contained" color="primary" icon="left" type="button" onClick={() => router.back()}>
                    Back
                  </CustomButton>
                  <CustomButton variant="contained" icon="save" type="submit">
                    Save
                  </CustomButton>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default AssessmentBasedImpactValues;
