'use client';

import { Box, CircularProgress, Typography, Grid, Paper, Divider, Chip, Avatar } from '@mui/material';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { useGetSpecificPlantInfoQuery } from '../../../AssignedPlantsList/AssignedPlantsListApi';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NumbersIcon from '@mui/icons-material/Numbers';
import FactoryIcon from '@mui/icons-material/Factory';

const excludeKeys = [
  'plantLogo',
  'name',
  'location',
  'registrationNo',
  'assessor',
  'asessmentTableAssignedList',
  'assessmentCompletion',
  'assessorCompletionStage',
  'createdAt',
  'updatedAt',
  'id',
];

export default function ViewPlantDetails() {
  const params = useParams();
  const organisationId = params?.organisationId as string;
  const plantId = params?.plantId as string;

  const { data, isFetching, isError } = useGetSpecificPlantInfoQuery(
    { organisationId, plantId },
    { skip: !organisationId || !plantId },
  );

  const plant = data?.data?.data;

  const filteredPlantInfo = useMemo(() => {
    if (!plant) return [];
    return Object.entries(plant).filter(([key]) => !excludeKeys.includes(key));
  }, [plant]);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !plant) {
    return (
      <Box p={3}>
        <Typography color="error">Error loading plant data.</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h6" fontWeight={600}>
        Plant Details
      </Typography>

      <Paper elevation={3} sx={{ borderRadius: 3, p: 3 }}>
        <Box display="flex" alignItems="flex-start" gap={3} mb={3}>
          {plant.plantLogo ? (
            <Avatar variant="circular" src={plant.plantLogo} alt={plant.name} sx={{ width: 100, height: 100 }} />
          ) : (
            <Avatar sx={{ width: 100, height: 100 }} variant="circular">
              <FactoryIcon sx={{ fontSize: '40px' }} />
            </Avatar>
          )}

          <Box>
            <Typography variant="h4" fontWeight={600} mb={1}>
              {plant.name}
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              <Chip icon={<LocationOnIcon />} label={`Location: ${plant.location}`} variant="outlined" />
              <Chip icon={<NumbersIcon />} label={`Reg No: ${plant.registrationNo}`} variant="outlined" />
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          {filteredPlantInfo.map(([key, value]) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={key}>
              <Box bgcolor="#f9f9f9" p={2} borderRadius={2} boxShadow={1}>
                <Typography variant="subtitle2" color="text.secondary" textTransform="capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </Typography>
                <Typography fontWeight={500}>{String(value)}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
