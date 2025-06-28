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
import { useChangeAssessmentStatusMutation, useGetAllPlantInfoQuery } from './PlantOverviewApi';
import { Box, Grid, IconButton, InputBase, Paper, Skeleton, Typography } from '@mui/material';
import { GridSearchIcon } from '@mui/x-data-grid';
import styles from './PlantOverview.module.css';
import { useDownloadReportMutation } from '@/app/(protectedRoutes)/(assessor)/ReportFinalizedPage/ReportFinalizedPageApi';

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
  const [downloadReport, { isLoading: isDownloading }] = useDownloadReportMutation();
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleButtonClick = async (tenantId: string, plantId: string, assessmentStage: string) => {
    console.log('AsseessmentStatus when click', assessmentStage === AsseessmentStatus.FINISH_ASSESSMENT);

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

    if (
      assessmentStage === AsseessmentStatus.START_ASSESSMENT ||
      assessmentStage === AsseessmentStatus.ONGOING_ASSESSMENT ||
      assessmentStage === AsseessmentStatus.COMPLETED_ASSESSMENT
    ) {
      router.push(`IndustrySelection/${tenantId}/${plantId}`);
    } else if (assessmentStage === AsseessmentStatus.FINISH_ASSESSMENT) {
      try {
        const bufferResponse = await downloadReport({
          tenantId,
          plantId,
        }).unwrap();

        const byteArray = new Uint8Array(bufferResponse.data);
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Assessment_Report.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Download failed:', error);
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
