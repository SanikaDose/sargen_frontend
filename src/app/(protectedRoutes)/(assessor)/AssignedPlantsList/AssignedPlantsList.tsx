'use client';

import { Box, Grid, IconButton, InputBase, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from '../../(organisation)/(plant)/PlantOverview/PlantOverview.module.css';
import { useRouter } from 'next/navigation';
import AssessorPlantInfoCard from './AssessorPlantInfoCard';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import { useGetAllAssignPlantQuery } from './AssignedPlantsListApi';
import { useDispatch } from 'react-redux';
import { setPageNameHeader, setShowAssessmentListSideBar } from '@/store/globalSlice';
import { pagesNames } from '@/constants/pagesHeaderNames';
import Loader from '@/components/Loader/Loader';
import { AssignedPlant } from './AssignPlantList.type';
import { GridSearchIcon } from '@mui/x-data-grid';

export default function AssignedPlantsList() {
  const router = useRouter();
  const assessorId = getValueLocalStorage('tenantId') || '';
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setShowAssessmentListSideBar(false));
    dispatch(setPageNameHeader(pagesNames.assessorAssignedPlants));
  }, [dispatch]);

  const { data: plantInfo, isLoading } = useGetAllAssignPlantQuery(assessorId ?? '', {
    skip: !assessorId,
  });

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const filteredPlants =
    plantInfo?.data?.filter((plant: AssignedPlant) => (plant.plantName ?? '').toLowerCase().includes(searchValue.toLowerCase())) ?? [];

  return (
    <div className={styles.wrapper}>
      {/* Changed Typography component to "div" to avoid p > form nesting */}
      <Typography component="div" className={styles.headingSection}>
        <Box className={styles.heading}>Assigned Plants List</Box>
        <Box sx={{ padding: 1 }}>
          <Paper
            sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#ECE6F0', borderRadius: '16px' }}
            className={styles.searchInput}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Plant..."
              inputProps={{ 'aria-label': 'search plant' }}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <GridSearchIcon />
            </IconButton>
          </Paper>
        </Box>
      </Typography>

      {/* Content Area */}
      <Box sx={{ mt: 2 }}>
        {isLoading ? (
          <Box height="40vh" display="flex" justifyContent="center" alignItems="center">
            <Loader loading={true} />
          </Box>
        ) : (
          <Grid container spacing={1.5} className={styles.gridContainer}>
            {filteredPlants.length > 0 ? (
              filteredPlants.map((plant: AssignedPlant) => {
                const organisationName = plant.organisationId ? plant.organisationId.split('-').slice(0, 2).join('-') : 'N/A';

                return (
                  <Grid key={plant.id} size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }} className={styles.cardGrid}>
                    <AssessorPlantInfoCard
                      data={{
                        plantId: plant.plantId,
                        plantName: plant.plantName,
                        organisationName,
                        organisationId: plant.organisationId,
                        assessmentCompletionStage: plant.assessmentCompletionStage,
                        createdAt: plant.createdAt,
                        updatedAt: plant.updatedAt,
                      }}
                      viewPlantOnClick={() => router.push(`/ViewPlantDetails/${plant.organisationId}/${plant.plantId}`)}
                    />
                  </Grid>
                );
              })
            ) : (
              <Box width="100%" textAlign="center" py={6} fontSize={16} color="#777">
                No plants found.
              </Box>
            )}
          </Grid>
        )}
      </Box>
    </div>
  );
}
