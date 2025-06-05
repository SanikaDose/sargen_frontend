'use client';

import { Header } from '@/components/Header/Header';
import InfoBox from '@/components/InfoBox/InfoBox';
import SideBar from '@/components/SideBar/SideBar';
import theme from '@/theme/theme';

import MenuIcon from '@mui/icons-material/Menu';
import { Fab, Grid, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [openSideBar, setOpenSideBar] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // <600
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600–899
  const isCompactDesktop = useMediaQuery('(min-width:901px) and (max-width:1045px)');
  console.log(openSideBar);
  // Check if sidebar should be permanent
  const isPermanentSidebar = !isMobile && !isTablet && !isCompactDesktop;

  const [showInfoBox, setShowInfoBox] = useState(true);

  useEffect(() => {
    console.log('width:', window.innerWidth);
  }, []);

  // Auto-close drawer on mobile/tablet for better UX
  useEffect(() => {
    if (isMobile || isTablet) {
      setOpenSideBar(false);
    } else if (isPermanentSidebar) {
      setOpenSideBar(true);
    }
  }, [isMobile, isTablet, isPermanentSidebar]);

  return (
    // Grid 1
    <Grid
      container
      sx={{
        minHeight: '100vh',
        margin: 0,
        width: '100%',
        position: 'relative', // For FAB positioning
      }}
      padding={0.5}
      size={12}
    >
      {/* Sidebar */}
      {/* Grid 1{1} */}
      {openSideBar && isPermanentSidebar && (
        <Grid size={{ lg: 2, xl: 2 }}>
          <SideBar
            onCloseTrigger={() => setOpenSideBar(false)}
            drawerType="permanent"
            drawerList={[
              { label: 'Orangization Information', toNavigate: '/' },
              { label: 'Point Of Contact', toNavigate: '/plantAssement' },
              { label: 'Plant', toNavigate: '/' },
              { label: 'Preview', toNavigate: '/' },
            ]}
          />
        </Grid>
      )}

      {/* Temporary Sidebar (Mobile/Tablet/Compact) - Outside Grid System */}
      {openSideBar && !isPermanentSidebar && (
        <SideBar onCloseTrigger={() => setOpenSideBar(false)} open={openSideBar} drawerType="temporary" />
      )}

      {/* Main content wrapper */}
      {/* Grid 1{2} */}
      <Grid
        size={
          openSideBar && isPermanentSidebar
            ? { xs: 12, sm: 12, md: 12, lg: 10, xl: 10 } // Adjust for sidebar space
            : { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 } // Full width when no sidebar or temporary
        }
        container
        direction="column"
        spacing={2}
        padding={0.3}
        border={'1px solid red'}
      >
        {/* Grid 1{2{1}} */}
        {/* Header */}
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} border={'1px solid pink'}>
          <Header
            title={'Assessor Onboarding'}
            user={{ name: 'viren', designation: 'SDE1', avatarUrl: 'https://avatar.iran.liara.run/public/19' }}
            onMenuClick={() => setOpenSideBar(!openSideBar)}
            showMenuButton={!openSideBar || !isPermanentSidebar} // Show menu button when drawer is closed or not permanent
          />
        </Grid>

        {/* Content and InfoBox wrapper */}
        {/* Grid 1{2{2}} */}
        <Grid
          size={12}
          container
          sx={{
            flexGrow: 1,
          }}
        >
          {/* Main content */}
          {/* Grid 1{2{2}{1}} */}
          <Grid
            size={!isMobile && !isTablet && showInfoBox ? { xs: 12, sm: 12, md: 8, lg: 8, xl: 9 } : 12}
            border={'3px solid gray'}
          >
            {children}
          </Grid>

          {/* Grid 1{2{2}{2}} */}
          {/* InfoBox */}
          {!isMobile && !isTablet && showInfoBox && (
            <Grid size={{ md: 4, lg: 3, xl: 3 }} border={'1px solid orange'}>
              <InfoBox sx={{ height: '100%' }} />
            </Grid>
          )}
        </Grid>

        {/* Additional Quick Access Button in Content Area */}
        {!openSideBar && (
          <Grid
            size={12}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              position: 'absolute',
              top: 80, // Below header
              left: 16,
              zIndex: 1000,
            }}
          >
            <Fab
              size="small"
              color="secondary"
              onClick={() => setOpenSideBar(true)}
              sx={{
                boxShadow: 2,
                opacity: 0.8,
                '&:hover': {
                  opacity: 1,
                },
              }}
            >
              <MenuIcon fontSize="small" />
            </Fab>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
