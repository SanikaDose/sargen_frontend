'use client';

import { Box, Grid, IconButton, InputBase, Paper, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './PlantOverview.module.css';
import AddPlantCard from '@/components/AddPlantCard/AddPlantCard';
import PlantInfoCard from '@/components/PlantInfoCard/PlantInfoCard';
import { useChangeAssessmentStatusMutation, useGetAllPlantInfoQuery } from './PlantOverviewApi';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import { pageRoutes } from '@/constants/pagesRoutes';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import { useDispatch } from 'react-redux';
import { setPageNameHeader, setShowAssessmentListSideBar } from '@/store/globalSlice';
import { pagesNames } from '@/constants/pagesHeaderNames';
// import { useGetAssesmentStatusMutation } from '@/app/(protectedRoutes)/(plantAssessment)/plantAssementApi';

import { AsseessmentStatus } from '@/constants/enums';
import { Plant } from './PlantOverview.type';

export default function PlantOverview() {
  const dispatch = useDispatch();
  const router = useRouter();
  const tenantId = getValueLocalStorage('tenantId') ?? '';
  // const showAssessmentListSideBar = useSelector((state: RootState) => state.global.showAssessmentListSideBar);

  // when ever the user will be there in plant overview then setShowAssessmentListSideBar will be always false
  // dispatch(setShowAssessmentListSideBar(false));
  const [searchValue, setSearchValue] = useState('');
  // const [assessmentStatuses, setAssessmentStatuses] = useState<Record<string, any>>({});
  // const [statusLoading, setStatusLoading] = useState(false);

  // Set page header
  useEffect(() => {
    dispatch(setPageNameHeader(pagesNames.organisationOnboardedPlantOverView));
  }, [dispatch]);

  // Reset sidebar visibility when entering PlantOverview page
  useEffect(() => {
    dispatch(setShowAssessmentListSideBar(false));
  }, [dispatch]);

  const { data: plantInfo, isLoading: plantsLoading } = useGetAllPlantInfoQuery({
    tenantId,
    search: searchValue,
  });

  const [postAssesmentStatus, { isLoading: assesmentStatusLoading }] = useChangeAssessmentStatusMutation();

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleButtonClick = async (tenantId: string, plantId: string, assessmentStage: string) => {
    if (assessmentStage === AsseessmentStatus.NOT_STARTED || assessmentStage === AsseessmentStatus.REQUESTED_ASSESSMENT) {
      try {
        await postAssesmentStatus({
          tenantId,
          plantId,
          assessment: AsseessmentStatus.REQUESTED_ASSESSMENT,
        }).unwrap();

        return;
      } catch (error) {
        console.error('Failed to change assessment status:', error);
        return;
      }
    }

    if (assessmentStage === 'STARTED') {
      //AsseessmentStatus.START_ASSESSMENT
      router.push(`IndustrySelection/${tenantId}/${plantId}`);
      dispatch(setShowAssessmentListSideBar(true));
    }
  };

  return (
    <div className={styles.wrapper}>
      <Typography className={styles.headingSection}>
        <Box className={styles.heading}>Plant Overview</Box>
        <Box sx={{ padding: 1 }}>
          <Paper
            component="form"
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
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
      </Typography>
      {plantsLoading || assesmentStatusLoading ? (
        <Grid
          container
          spacing={{ xs: 1.5, md: 1.5 }}
          columns={{ xs: 12, sm: 12, md: 12, xl: 12, lg: 12 }}
          className={styles.gridContainer}
        >
          {[...Array(8)].map((_, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }} className={styles.cardGrid}>
              <Box sx={{ padding: 2, borderRadius: '12px', backgroundColor: '#f4f4f4', width: '100%' }}>
                <Skeleton variant="rectangular" width="100%" height={140} />
                <Skeleton variant="text" height={30} sx={{ mt: 1 }} />
                <Skeleton variant="text" height={20} width="60%" />
                <Skeleton variant="text" height={20} width="80%" />
                <Skeleton variant="text" height={20} width="40%" />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid
          container
          spacing={{ xs: 1.5, md: 1.5 }}
          columns={{ xs: 12, sm: 12, md: 12, xl: 12, lg: 12 }}
          className={styles.gridContainer}
        >
          {/* Add Plant Card */}
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }} className={styles.cardGrid}>
            <AddPlantCard backgroundColor="#D4D4D4" label="Click To Add Plant" onClick={() => router.push(pageRoutes.plant.addPlant)} />
          </Grid>

          {/* Plant Info Cards */}
          {Array.isArray(plantInfo?.data) &&
            plantInfo.data.map((plant: Plant) => (
              <Grid key={plant.id} size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }} className={styles.cardGrid}>
                <PlantInfoCard
                  data={{
                    age: plant.age,
                    assessmentCompletionPercentage: plant.assessmentCompletionPercentage,
                    assessmentStartDate: plant.assessmentDate,
                    createdAt: plant.createdAt,
                    debriefDate: plant.debriefDate,
                    gstin: plant.gstin,
                    location: plant.location,
                    name: plant.name,
                    numberOfEmployees: plant.numberOfEmployees,
                    numberOfLines: plant.numberOfLines,
                    plantLogo: plant.plantLogo || '',
                    registrationNo: plant.registrationNo,
                    revenue: plant.revenue,
                    updatedAt: plant.debriefDate,
                    assessmentCompletionStage: plant?.assessmentCompletionStage,
                  }}
                  editPlantOnClick={() => router.push(`EditPlant/${tenantId}/${plant.id}`)}
                  onClick={() => handleButtonClick(tenantId, plant.id, plant?.assessmentCompletionStage)}
                />
              </Grid>
            ))}
        </Grid>
      )}
    </div>
  );
}
