'use client';

import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import AddPlantCard from '@/components/AddPlantCard/AddPlantCard';
import PlantInfoCard from '@/components/PlantInfoCard/PlantInfoCard';
import { AsseessmentStatus } from '@/constants/enums';
import { pagesNames } from '@/constants/pagesHeaderNames';
import { pageRoutes } from '@/constants/pagesRoutes';
import { useDispatch } from 'react-redux';
import { setPageNameHeader, setShowAssessmentListSideBar } from '@/store/globalSlice';
// import { useGetAssesmentStatusMutation } from '@/app/(protectedRoutes)/(plantAssessment)/plantAssementApi';
import { Plant } from './PlantOverview.type';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAutomateTheAssessmentStatusMutation, useGetAllPlantInfoQuery } from './PlantOverviewApi';
import { Box, Grid, IconButton, InputBase, Paper, Typography } from '@mui/material';
import { GridSearchIcon } from '@mui/x-data-grid';
import styles from './PlantOverview.module.css';
import { useDownloadReportMutation } from '@/app/(protectedRoutes)/(assessor)/ReportFinalizedPage/ReportFinalizedPageApi';
import Loader from '@/components/Loader/Loader';

export default function PlantOverview() {
  const dispatch = useDispatch();
  const router = useRouter();
  const tenantId = getValueLocalStorage('tenantId') ?? '';

  const [searchValue, setSearchValue] = useState('');

  // Set page header
  useEffect(() => {
    dispatch(setPageNameHeader(pagesNames.organisationOnboardedPlantOverView));
  }, [dispatch]);

  // Reset sidebar visibility when entering PlantOverview page
  useEffect(() => {
    dispatch(setShowAssessmentListSideBar(false));
  }, [dispatch]);

  const {
    data: plantInfo,
    isLoading: plantsLoading,
    refetch: refetchPlantInfo,
  } = useGetAllPlantInfoQuery({
    tenantId,
    search: searchValue,
  });

  useEffect(() => {
    refetchPlantInfo();
  }, [searchValue, refetchPlantInfo, router]);

  // this is an api to change the assesment status
  // const [postAssesmentStatus, { isLoading: assesmentStatusLoading }] = useChangeAssessmentStatusMutation();

  //newly implement the api to bypass the assesment status
  const [automateAssessmentStatus, { isLoading: automatingProcessLoading }] = useAutomateTheAssessmentStatusMutation();
  const [downloadReport] = useDownloadReportMutation();
  const [downloadingPlantId, setDownloadingPlantId] = useState<string | null>(null);
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleButtonClick = async (tenantId: string, plantId: string, assessmentStage: string) => {
    console.log('AsseessmentStatus when click', assessmentStage === AsseessmentStatus.FINISH_ASSESSMENT);

    if (assessmentStage === AsseessmentStatus.NOT_STARTED || assessmentStage === AsseessmentStatus.REQUESTED_ASSESSMENT) {
      try {
        // this is an api to change the assesment styatus which will be uncomment
        // await postAssesmentStatus({
        //   tenantId,
        //   plantId,
        //   assessment: AsseessmentStatus.REQUESTED_ASSESSMENT,
        // }).unwrap();

        await automateAssessmentStatus({
          tenantId,
          plantId,
        });

        return;
      } catch (error) {
        console.error('Failed to change assessment status:', error);
        return;
      }
    }

    if (
      assessmentStage === AsseessmentStatus.START_ASSESSMENT ||
      assessmentStage === AsseessmentStatus.ONGOING_ASSESSMENT ||
      assessmentStage === AsseessmentStatus.COMPLETED_ASSESSMENT
    ) {
      router.push(`IndustrySelection/${tenantId}/${plantId}`);
    } else if (assessmentStage === AsseessmentStatus.FINISH_ASSESSMENT) {
      setDownloadingPlantId(plantId);
      try {
        const { blob, filename } = await downloadReport({
          tenantId,
          plantId,
        }).unwrap(); // blob and filename from backend

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Download failed:', error);
      } finally {
        setDownloadingPlantId(null);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* FIXED: Added component="div" to prevent Typography from rendering as <p> */}
      <Typography component="div" className={styles.headingSection}>
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
      {plantsLoading || automatingProcessLoading ? (
        <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Loader loading={true} />
        </Box>
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
                    updatedAt: plant.updatedAt,
                    gstin: plant.gstin,
                    location: plant.location,
                    name: plant.name,
                    numberOfEmployees: plant.numberOfEmployees,
                    numberOfLines: plant.numberOfLines,
                    plantLogo: plant.plantLogo || '',
                    registrationNo: plant.registrationNo,
                    revenue: plant.revenue,
                    assessmentCompletionStage: plant?.assessmentCompletionStage,
                  }}
                  editPlantOnClick={() => router.push(`EditPlant/${tenantId}/${plant.id}`)}
                  onClick={() => handleButtonClick(tenantId, plant.id, plant?.assessmentCompletionStage)}
                  downloadReportLoading={downloadingPlantId === plant.id}
                />
              </Grid>
            ))}
        </Grid>
      )}
    </div>
  );
}
