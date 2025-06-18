'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import InfoBox from '@/components/InfoBox/InfoBox';
import { useGetSolutionsByImpactQuery, useSelectSolutionsByImpactMutation } from './AssessmentSolutionApi';
import { Box, Typography, Grid, List, ListItemButton, Paper, Checkbox } from '@mui/material';
import styles from './AssessmentSolution.module.css';

interface Solution {
  id: string;
  solution_name: string;
  solution_category: string;
  solution_band_weight: number;
  isSelected?: boolean;
}

interface DimensionWithSolutions {
  dimension: string;
  solutions: Solution[];
}

const AssessmentSolution = () => {
  const params = useParams();
  const router = useRouter();
  const organisationId = params.organisationId as string;
  const plantId = params.plantId as string;
  const tenantId = getValueLocalStorage('tenantId');

  const {
    data: solutionsData,
    error: solutionsError,
    isLoading: solutionsLoading,
  } = useGetSolutionsByImpactQuery({ tenantId, plantId });

  const [selectSolutionsByImpact, { isLoading: isSavingSolutions }] = useSelectSolutionsByImpactMutation();
  const [dimensionsWithSolutions, setDimensionsWithSolutions] = useState<DimensionWithSolutions[]>([]);
  const [selectedSolutions, setSelectedSolutions] = useState<Set<string>>(new Set());

  const formatDimensionName = (name: string): string => {
    return name
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/([a-zA-Z])(\d)/g, '$1 $2')
      .replace(/(\d)([a-zA-Z])/g, '$1 $2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
      .replace(/\b\w/g, (match) => match.toUpperCase())
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
      .replace(/^[a-z]/, (match) => match.toUpperCase());
  };

  useEffect(() => {
    if (solutionsData && Array.isArray(solutionsData)) {
      const processedData = solutionsData.map((item: DimensionWithSolutions) => ({
        ...item,
        dimension: formatDimensionName(item.dimension),
      }));
      setDimensionsWithSolutions(processedData);

      const initiallySelected = new Set<string>();
      solutionsData.forEach((dimension: DimensionWithSolutions) => {
        dimension.solutions.forEach((solution: Solution) => {
          if (solution.isSelected) {
            initiallySelected.add(solution.id);
          }
        });
      });
      setSelectedSolutions(initiallySelected);
    }
  }, [solutionsData]);

  const toggleSolutionSelection = (solutionId: string) => {
    setSelectedSolutions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(solutionId)) {
        newSet.delete(solutionId);
      } else {
        newSet.add(solutionId);
      }
      return newSet;
    });
  };

  const handleSave = async () => {
    try {
      const selectedSolutionWithBandWeight = dimensionsWithSolutions
        .flatMap((dim) => dim.solutions)
        .filter((sol) => selectedSolutions.has(sol.id))
        .map((sol) => ({
          id: sol.id,
          solution_name: sol.solution_name,
          solution_category: sol.solution_category,
          solution_band_weight: sol.solution_band_weight,
          isselected: true,
        }));

      const solutionsPayload = {
        tenantId,
        plantId,
        selectedSolutionWithBandWeight,
      };

      const result = await selectSolutionsByImpact(solutionsPayload).unwrap();

      if (result) {
        router.push(`/PlanningHorizon/${organisationId}/${plantId}`);
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('Something went wrong while saving solutions');
    }
  };

  if (solutionsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Typography>Loading solutions...</Typography>
      </Box>
    );
  }

  if (solutionsError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Typography color="error">Error loading solutions. Please try again.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '99%' }}>
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
            <Typography variant="h6">Assessment Solutions</Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              {dimensionsWithSolutions.map((item) => (
                <Grid size={{ xs: 12, sm: 6 }} key={item.dimension}>
                  <Box className={styles.solutionCard}>
                    <Typography sx={{ fontSize: '18px' }} className={styles.solutionTitle}>
                      {item.dimension}
                    </Typography>
                    <List component="div" disablePadding>
                      {item.solutions.map((solution) => (
                        <ListItemButton
                          key={solution.id}
                          className={styles.solutionItem}
                          onClick={() => toggleSolutionSelection(solution.id)}
                          sx={{
                            backgroundColor: selectedSolutions.has(solution.id) ? '#e3f2fd' : 'transparent',
                            '&:hover': {
                              backgroundColor: selectedSolutions.has(solution.id) ? '#bbdefb' : '#f5f5f5',
                            },
                          }}
                        >
                          <Checkbox
                            checked={selectedSolutions.has(solution.id)}
                            onChange={() => toggleSolutionSelection(solution.id)}
                            sx={{ mr: 1 }}
                          />
                          <Typography sx={{ fontSize: '16px' }}>{solution.solution_name}</Typography>
                        </ListItemButton>
                      ))}
                    </List>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box className={styles.rightSection}>
            <Box className={styles.aboutSection}>
              <InfoBox
                content="Select the solutions that best align with your selected impact dimensions. These solutions will help address the key areas identified in your assessment."
                heading="About Assessment Solutions"
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
              <CustomButton
                variant="contained"
                icon="save"
                type="button"
                onClick={handleSave}
                disabled={isSavingSolutions}
              >
                {isSavingSolutions ? 'Saving...' : 'Save'}
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AssessmentSolution;
