'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import InfoBox from '@/components/InfoBox/InfoBox';
import { useGetSolutionsByImpactQuery, useSelectSolutionsByImpactMutation } from './AssessmentSolutionApi';
import { Box, Typography, Grid, List, ListItemButton, Paper, Checkbox, Divider } from '@mui/material';
import styles from './AssessmentSolution.module.css';
import { useDispatch } from 'react-redux';
import { setPageNameHeader, setShowAssessmentListSideBar } from '@/store/globalSlice';
import { pagesNames } from '@/constants/pagesHeaderNames';
import Loader from '@/components/Loader/Loader';
import { setPlantAssessmentDepartment } from '../../(plantAssessment)/plantAssementSlice';

interface Solution {
  id: string;
  solution_name: string;
  solution_category: string;
  solution_band_weight: number;
  isselected?: boolean;
}

const AssessmentSolution = () => {
  const params = useParams();
  const router = useRouter();
  const tenantId = params.organisationId as string;
  const plantId = params.plantId as string;
  const { data, error, isLoading } = useGetSolutionsByImpactQuery({ tenantId, plantId });
  const [selectSolutionsByImpact, { isLoading: isSavingSolutions }] = useSelectSolutionsByImpactMutation();
  const [groupedSolutions, setGroupedSolutions] = useState<Record<string, Solution[]>>({});
  const [selectedSolutions, setSelectedSolutions] = useState<Set<string>>(new Set());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageNameHeader(pagesNames.assessorSolutionSelection));
    dispatch(setShowAssessmentListSideBar(true));
    dispatch(setPlantAssessmentDepartment(''));
  }, [dispatch]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const grouped = data.reduce((acc: Record<string, Solution[]>, solution: Solution) => {
        const category = solution.solution_category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(solution);
        return acc;
      }, {});
      setGroupedSolutions(grouped);

      const initiallySelected = new Set<string>();
      data.forEach((solution) => {
        if (solution.isselected) {
          initiallySelected.add(solution.id);
        }
      });
      setSelectedSolutions(initiallySelected);
    }
  }, [data]);

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
      const selectedSolutionWithBandWeight = Object.values(groupedSolutions)
        .flat()
        .filter((sol) => selectedSolutions.has(sol.id))
        .map((sol) => ({
          id: sol.id,
          solution_name: sol.solution_name,
          solution_category: sol.solution_category,
          solution_band_weight: sol.solution_band_weight,
          isselected: true,
        }));

      const payload = {
        tenantId,
        plantId,
        selectedSolutionWithBandWeight,
      };

      const result = await selectSolutionsByImpact(payload).unwrap();
      if (result) {
        router.push(`/AddReportData/${tenantId}/${plantId}`);
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('Something went wrong while saving solutions');
    }
  };

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Typography color="error">Error loading solutions. Please try again.</Typography>
      </Box>
    );
  }

  return (
    <>
      {isLoading || isSavingSolutions ? (
        <Loader loading={true} />
      ) : (
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
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {Object.entries(groupedSolutions).map(([category, solutions]) => (
                    <Grid size={{ xs: 12, md: 6 }} key={category}>
                      <Box className={styles.solutionCard}>
                        <Typography
                          variant="h6"
                          className={styles.solutionTitle}
                          sx={{ fontSize: '16px', color: '#FFFFFF', fontWeight: 600 }}
                        >
                          {category.replace(/_/g, ' ').charAt(0).toUpperCase() + category.replace(/_/g, ' ').slice(1).toLowerCase()}
                        </Typography>
                        <List component="div" disablePadding>
                          {solutions.map((solution, idx) => (
                            <Box key={solution.id}>
                              <ListItemButton className={styles.solutionItem}>
                                <Checkbox
                                  checked={selectedSolutions.has(solution.id)}
                                  onChange={() => toggleSolutionSelection(solution.id)}
                                />
                                <Typography sx={{ fontSize: '16px' }}>{solution.solution_name}</Typography>
                              </ListItemButton>
                              {idx < solutions.length - 1 && <Divider />}
                            </Box>
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
                  <CustomButton variant="contained" icon="save" type="button" onClick={handleSave} disabled={isSavingSolutions}>
                    {isSavingSolutions ? 'Saving...' : 'Save'}
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

export default AssessmentSolution;
