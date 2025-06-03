'use client';

import { Grid, Typography } from '@mui/material';
import React from 'react';
import styles from './PlantOverview.module.css';
import AddPlantCard from '@/components/AddPlantCard/AddPlantCard';
import PlantInfoCard from '@/components/PlantInfoCard/PlantInfoCard';
import { useGetAllPlantInfoQuery } from './PlantOverviewApi';

export default function PlantOverview() {
  const tenantId = 'tanpure-corp-c8e1eeba-65d8-4351-837c-d1b5b5f45bbf';

  const { data: plantInfo, isLoading: plantsLoading } = useGetAllPlantInfoQuery(tenantId);

  return (
    <div className={styles.wrapper}>
      <Typography variant="h6" className={styles.heading}>
        Plant Registration
      </Typography>

      <Grid
        container
        spacing={{ xs: 1, md: 1 }}
        columns={{ xs: 12, sm: 12, md: 12, xl: 12, lg: 12 }}
        className={styles.gridContainer}
      >
        {/* Add Plant Card */}
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }} className={styles.cardGrid}>
          <AddPlantCard backgroundColor="#D4D4D4" label="Click To Add Plant" onClick={() => {}} />
        </Grid>

        {/* Plant Info Cards */}
        {!plantsLoading &&
          Array.isArray(plantInfo?.data) &&
          plantInfo.data.map((plant: any) => (
            <Grid key={plant.id} size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }} className={styles.cardGrid}>
              <PlantInfoCard
                data={{
                  age: plant.age,
                  assessmentCompletionPercentage: plant.assessmentCompletion,
                  assessmentStartDate: plant.assessmentDate,
                  createdAt: plant.assessmentDate,
                  debriefDate: plant.debriefDate,
                  gstin: plant.gstin,
                  location: plant.location,
                  name: plant.name,
                  numberOfEmployees: plant.noOfEmployees,
                  numberOfLines: plant.noOfLines,
                  plantLogo: plant.plantLogo,
                  registrationNo: plant.registrationNo,
                  revenue: plant.revenue,
                  updatedAt: plant.debriefDate,
                }}
                onClick={() => {}}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
