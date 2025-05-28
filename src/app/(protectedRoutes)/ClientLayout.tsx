'use client';

import { Header } from '@/components/Header/Header';
import InfoBox from '@/components/InfoBox/InfoBox';
import SideBar from '@/components/SideBar/SideBar';

import { Grid, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(min-width:600px) and (max-width:900px)');
  const [showInfoBox, setShowInfoBox] = useState(false);
  useEffect(() => {}, [open]);

  return (
    <Grid
      container
      sx={{
        minHeight: '100vh',
        margin: 0,
        width: '100%',
      }}
      padding={0.5}
    >
      {/* Sidebar */}
      {open && (
        <Grid
          size={{ xs: 12, sm: 12, md: 2, lg: 2, xl: 2 }}
          sx={{
            position: isMobile || isTablet ? 'fixed' : 'relative',
            zIndex: 1200,
            // width: isMobile || isTablet ? '100vw' : 'auto',
            height: isMobile || isTablet ? '100vh' : 'auto',
          }}
        >
          <SideBar
            onCloseTrigger={() => setOpen(false)}
            drawerType={isMobile || isTablet ? 'temporary' : 'permanent'}
          />
        </Grid>
      )}

      {/* Main content wrapper */}
      <Grid
        size={{ xs: 12, sm: 12, md: open ? 10 : 12, lg: 10, xl: 10 }}
        container
        direction="column"
        spacing={2}
        padding={0.3}
      >
        {/* Header */}
        <Grid size={12}>
          <Header
            title={'Assessor Onboarding'}
            user={{ name: 'viren', designation: 'SDE1', avatarUrl: 'https://avatar.iran.liara.run/public/19' }}
            onMenuClick={() => setOpen(!open)}
          />
        </Grid>

        {/* Content and InfoBox wrapper */}

        <Grid
          size={12}
          container
          sx={{
            flexGrow: 1,
          }}
        >
          {/* Main content */}
          <Grid
            size={!isMobile && !isTablet && showInfoBox ? { xs: 12, sm: 12, md: 8, lg: 8, xl: 9 } : 12}
            border={'5px solid gray'}
          >
            {children}
          </Grid>

          {/* InfoBox */}
          {!isMobile && !isTablet && showInfoBox && (
            <Grid size={{ md: 4, lg: 3, xl: 3 }} border={'1px solid orange'}>
              <InfoBox sx={{ height: '100%' }} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
