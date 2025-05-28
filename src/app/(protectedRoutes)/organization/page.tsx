// src/app/(protectedRoutes)/(organization)/page.tsx

'use client';

import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import SideBar from '@/components/sideBar/SideBar';
import Stepper from '@/components/Stepper/Stepper';
import { InputWithLabel } from '@/components/InputWithLabels/InputWithLabel';
import { Header } from '@/components/Header/Header';
const OrganizationPage = () => {
  return (
    <Container >
      <Grid container >
        {/* Sidebar on the left */}
        <Grid >
          <SideBar
            open={true}
            drawerList={['All mail', 'Trash', 'Spam']}
            onCloseTrigger={() => {}}
          />
        </Grid>

        {/* Main Content: Stepper + InputField */}
        <Grid >
            <Box >
                <Header title='Onboarding / Organization'/>
            </Box>
          <Box my={3}>
            <Stepper  steps ={[{ label: 'Logo' }, { label: 'Name' }, { label: 'Website' }, { label: 'GST IN' },{ label: 'Revenue' }, { label: 'No. of Employee' },]} />
          </Box>
          
        </Grid>
        <Grid>
            <Grid item xs={12} md={2} sx={{ borderRight: '1px solid #ccc' }}>
          <SideBar
            open={true}
            drawerList={['All mail', 'Trash', 'Spam']}
            onCloseTrigger={() => {}}
          />
        </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrganizationPage;
