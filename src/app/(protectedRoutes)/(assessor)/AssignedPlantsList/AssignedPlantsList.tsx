'use client';

import { Box, Divider, Grid, IconButton, InputBase, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import styles from '../../(organisation)/(plant)/PlantOverview/PlantOverview.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import AssessorPlantInfoCard from './AssessorPlantInfoCard';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import { useGetAllAssignPlantQuery } from './AssignedPlantsListApi';
import { useDispatch } from 'react-redux';
import { setPageNameHeader } from '@/store/globalSlice';
import { pagesNames } from '@/constants/pagesHeaderNames';
import Loader from '@/components/Loader/Loader';
import { AssignedPlant } from './AssignPlantList.type';

export default function AssignedPlantsList() {
  const router = useRouter();
  const assessorId = getValueLocalStorage('tenantId') || '';
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  dispatch(setPageNameHeader(pagesNames.assessorAssignedPlants));

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
      <Typography className={styles.headingSection}>
        <Box className={styles.heading}>Assigned Plants List</Box>
        <Box sx={{ padding: 1 }}>
          <Paper
            component="form"
            sx={{ display: 'flex', alignItems: 'center' }}
            className={styles.searchInput}
            onSubmit={(e) => e.preventDefault()}
          >
            <InputBase
              value={searchValue}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Plant..."
              inputProps={{ 'aria-label': 'search plant' }}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
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
