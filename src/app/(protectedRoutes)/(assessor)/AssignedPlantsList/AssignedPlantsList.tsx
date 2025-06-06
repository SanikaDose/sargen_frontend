'use client';

import { Box, Divider, Grid, IconButton, InputBase, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import styles from '../../(organisation)/(plant)/PlantOverview/PlantOverview.module.css';
import AddPlantCard from '@/components/AddPlantCard/AddPlantCard';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import { pageRoutes } from '@/constants/pagesRoutes';
import { useGetAllPlantInfoQuery } from '../../(organisation)/(plant)/PlantOverview/PlantOverviewApi';
import AssessorPlantInfoCard from './AssessorPlantInfoCard';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';

export default function AssignedPlantsList() {
  const tenantId = getValueLocalStorage('tenantId');
  const [searchValue, setSearchValue] = useState('');
  const { data: plantInfo, isLoading: plantsLoading } = useGetAllPlantInfoQuery({ tenantId, search: searchValue });
  const router = useRouter();
  const handleSearch = (value: string) => {
    console.log('search value ', value);
    setSearchValue(value);
  };
  return (
    <div className={styles.wrapper}>
      <Typography className={styles.headingSection}>
        <Box className={styles.heading}>Assigned Plants List</Box>
        <Box sx={{ padding: 1 }}>
          <Paper component="form" sx={{ display: 'flex', alignItems: 'center' }} className={styles.searchInput}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Plant..."
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          </Paper>
        </Box>
      </Typography>

      <Grid
        container
        spacing={{ xs: 1.5, md: 1.5 }}
        columns={{ xs: 12, sm: 12, md: 12, xl: 12, lg: 12 }}
        className={styles.gridContainer}
      >
        {/* Add Plant Card */}
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }} className={styles.cardGrid}>
          <AddPlantCard
            backgroundColor="#D4D4D4"
            label="Click To Add Plant"
            onClick={() => {
              router.push(pageRoutes.plant.addPlant);

              console.log(pageRoutes.plant.addPlant);
            }}
          />
        </Grid>

        {/* Plant Info Cards */}
        {!plantsLoading &&
          Array.isArray(plantInfo?.data) &&
          plantInfo.data.map((plant: any) => (
            <Grid key={plant.id} size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }} className={styles.cardGrid}>
              <AssessorPlantInfoCard
                data={{
                  age: plant.age,
                  assessmentCompletionPercentage: plant.assessmentCompletion,
                  assessmentStartDate: plant.assessmentDate,
                  createdAt: plant.assessmentDate,
                  debriefDate: plant.debriefDate,
                  gstin: plant.gstin,
                  location: plant.location,
                  name: plant.name,
                  numberOfEmployees: plant.numberOfEmployees,
                  numberOfLines: plant.numberOfLines,
                  plantLogo: plant.plantLogo,
                  registrationNo: plant.registrationNo,
                  revenue: plant.revenue,
                  updatedAt: plant.debriefDate,
                }}
                viewPlantOnClick={() => {
                  console.log('plant id', plant.id);
                  router.push(`ViewPlant/${tenantId}/${plant.id}`);
                }}
                onClick={() => {}}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
