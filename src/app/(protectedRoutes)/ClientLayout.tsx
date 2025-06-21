'use client';
import { assessorExtraList, assessorOnboardedMenuList } from '@/constants/sideBarLists/assessorOnboardedList';
import { assessorOnboardingMenuList } from '@/constants/sideBarLists/assessorOnboardingList';
import { organisationExtraMenuList, organisationOnboardedMenuList } from '@/constants/sideBarLists/organisationOnboardedList';
import { organisationOnboardingMenuList } from '@/constants/sideBarLists/organisationOnboardingList';
import { setExtraListItems, setSideBarListItem, setSideBarListItemsForAssessment } from '@/store/globalSlice';
import { RootState } from '@/store/store';

import { Avatar, Button, useMediaQuery } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { jwtDecode } from 'jwt-decode';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OnboardingStatus, Token, UserType } from '../(unprotectedRoutes)/login/login.types';

import { assessorUserAssessmentList, platformUserAssessmentList } from '@/constants/sideBarLists/plantAssessmentMenuList';
import { SidebarItem } from '@/constants/sideBarLists/sideBarList.type';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ICONS } from '../utils/iconsMap';
import { getValueLocalStorage } from '../utils/localStorageGetterSetter';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const router = useRouter();

  const tenantId = getValueLocalStorage('tenantId');
  if (!tenantId) {
    router.push('/login');
  }

  // Media queries to detect device type
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // <600px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600-960px
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // >=960px

  // For desktop/laptop, sidebar is always open; for mobile/tablet, it's controlled by state
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const open = isDesktop ? true : mobileOpen;
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    if (!isDesktop) {
      setMobileOpen(true);
    }
  };

  const handleDrawerClose = () => {
    if (!isDesktop) {
      setMobileOpen(false);
    }
  };
  const [decodedToken, setDecodedToken] = React.useState<Token | null>(null);

  // Only one useEffect is needed
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('Authorization');
      console.log(token);
      if (token) {
        const decoded: Token = jwtDecode(token);
        setDecodedToken(decoded);
      }
    }
  }, []);

  // Safe destructuring with fallback
  const userRoleFromLocalStorage = decodedToken?.userRole;
  const userTypeFromLocalStorage = decodedToken?.userType;

  const onboardingStatus: string = useSelector((state: RootState) => state.tokenDecode.onboardingStatus) || '';

  const userType = useSelector((state: RootState) => state.tokenDecode.decodedToken?.userType) || userTypeFromLocalStorage;

  //Side bar list items states
  const sideBarListItems: SidebarItem[] = useSelector((state: RootState) => state.global.SideBarListItem);
  const sideBarListItemsForAssessment: SidebarItem[] = useSelector((state: RootState) => state.global.sideBarListItemsForAssessment);
  const extraListItems: SidebarItem[] = useSelector((state: RootState) => state.global.extraListItems);

  //Side bar assessment state mangament
  const showAssessmentListSideBar = useSelector((state: RootState) => state.global.showAssessmentListSideBar);
  const pageNameHeader: string = useSelector((state: RootState) => state.global.pageNameHeader);

  // For showing the assesment list
  // For organisation
  if (onboardingStatus === OnboardingStatus.COMPLETED && userType && userType[0] === UserType.PLATFORMUSER && showAssessmentListSideBar) {
    dispatch(setSideBarListItemsForAssessment(platformUserAssessmentList));
  }
  // For assessor
  if (onboardingStatus === OnboardingStatus.COMPLETED && userType && userType[0] === UserType.ASSESSOR && showAssessmentListSideBar) {
    dispatch(setSideBarListItemsForAssessment(assessorUserAssessmentList));
  }

  //For assessor
  const sideBarListItemOnClick = (link: string) => {
    router.push(link);

    // Create the updated list
    const updatedList = sideBarListItems.map((item) => ({
      ...item,
      isActive: item.linkRoute === link,
    }));

    // Dispatch to global state
    dispatch(setSideBarListItem(updatedList));
  };

  const pathName = usePathname();

  // Component mount and change in the dependency the component will remount
  console.log('onboarding', onboardingStatus);
  React.useEffect(() => {
    if (!userType || !onboardingStatus) return;

    if (onboardingStatus === OnboardingStatus.NOT_STARTED || onboardingStatus === OnboardingStatus.STARTED) {
      // Not completed: show onboarding list
      if (userType[0] === UserType.PLATFORMUSER) {
        dispatch(setSideBarListItem(organisationOnboardingMenuList));
      } else if (userType[0] === UserType.ASSESSOR) {
        dispatch(setSideBarListItem(assessorOnboardingMenuList));
      }
    } else {
      // COMPLETED: show onboarded + extra list
      if (userType[0] === UserType.PLATFORMUSER) {
        dispatch(setSideBarListItem(organisationOnboardedMenuList));
        dispatch(setExtraListItems(organisationExtraMenuList));
      } else if (userType[0] === UserType.ASSESSOR) {
        dispatch(setSideBarListItem(assessorOnboardedMenuList));
        dispatch(setExtraListItems(assessorExtraList));
      }
    }
  }, [userType, onboardingStatus, dispatch]);

  // Separate useEffect for assessment lists
  React.useEffect(() => {
    if (onboardingStatus === OnboardingStatus.COMPLETED && showAssessmentListSideBar && userType) {
      if (userType[0] === UserType.PLATFORMUSER) {
        dispatch(setSideBarListItemsForAssessment(platformUserAssessmentList));
      } else if (userType[0] === UserType.ASSESSOR) {
        dispatch(setSideBarListItemsForAssessment(assessorUserAssessmentList));
      }
    }
    console.log('extraListItems:', extraListItems);
  }, [onboardingStatus, userType, showAssessmentListSideBar, dispatch]);

  return (
    <Box sx={{ display: 'flex', height: '95%' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          background: `${theme.palette.background.paper} !important`,
          boxShadow: 0,
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            color="inherit"
            edge="start"
            sx={[
              { color: theme.palette.primary.main, mr: 2 },
              // Hide menu icon when sidebar is open OR when on desktop
              (open || isDesktop) && { display: 'none' },
            ]}
          >
            <MenuIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
          </IconButton>
          <Typography sx={{ color: theme.palette.text.primary }} variant="h4" noWrap component="div">
            {pageNameHeader}
          </Typography>

          <Box display="flex" flexDirection="column" alignItems="flex-end" sx={{ marginLeft: 'auto' }}>
            <Typography variant="body1" fontWeight="bold" sx={{ color: 'text.primary' }}>
              Viren Patil
            </Typography>
            <Typography variant="body2" sx={{ color: `${theme.palette.text.disabled} !important` }}>
              Software Engineer
            </Typography>
          </Box>
          <Button variant="text">
            <Avatar src="https://avatar.iran.liara.run/public/19" />
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isDesktop ? drawerWidth : '100%', // mobile full width
            height: '100%', // mobile full height
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.background.paper,
          },
        }}
        variant={isDesktop ? 'permanent' : 'persistent'}
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box
            component="img"
            src="/sargen-png-logo.png"
            alt="Sargen Logo"
            sx={{
              maxWidth: isDesktop ? '100%' : '50%',
              height: 'auto',
              padding: isDesktop ? 0 : 1,
              display: 'block',
              margin: '0 auto',
            }}
          />

          {/* Hide close icon on desktop */}
          {!isDesktop && (
            <IconButton onClick={handleDrawerClose} sx={{ color: theme.palette.primary.main }}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          )}
        </DrawerHeader>
        <Divider />
        {/* Main list */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          <>
            <Typography sx={{ pl: 2, pt: 2, fontWeight: 'bold' }} variant="subtitle2">
              {onboardingStatus !== OnboardingStatus.COMPLETED ? 'Onboarding menu' : 'Menu'}
            </Typography>

            {sideBarListItems.map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{
                  pl: 0,
                  backgroundColor: item.linkRoute === pathName ? 'secondary.main' : 'transparent',
                  // '&:hover': {
                  //   backgroundColor: item.linkRoute === pathName ? 'secondary.main' : 'grey.100',
                  // },
                }}
              >
                <ListItemButton onClick={() => sideBarListItemOnClick(item.linkRoute)}>
                  <ListItemIcon
                    sx={{
                      mr: 2,
                      color: item.linkRoute === pathName ? theme.palette.primary.main : 'text.primary',
                    }}
                  >
                    {item.icon && ICONS[item.icon] ? React.createElement(ICONS[item.icon]) : null}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="caption"
                        sx={{
                          color: item.linkRoute === pathName ? theme.palette.primary.main : 'text.primary',
                          // fontWeight: item.linkRoute === pathName ? 600 : 550,
                        }}
                      >
                        {item.text}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}

            {/* SubList which will be activated in the assessement view for both  */}
          </>
          {showAssessmentListSideBar && onboardingStatus === OnboardingStatus.COMPLETED && (
            <>
              <Typography sx={{ pl: 2, pt: 2, fontWeight: 'bold' }} variant="subtitle2">
                Assessment menu
              </Typography>
              {sideBarListItemsForAssessment.map((item) => (
                <ListItem
                  key={item.text}
                  disablePadding
                  sx={{
                    pl: 0,
                    backgroundColor: item.linkRoute === pathName ? 'secondary.main' : 'transparent',
                    // '&:hover': {
                    //   backgroundColor: item.linkRoute === pathName ? 'secondary.main' : 'grey.100',
                    // },
                  }}
                >
                  <ListItemButton onClick={() => sideBarListItemOnClick(item.linkRoute)}>
                    <ListItemIcon
                      sx={{
                        mr: 2,
                        color: item.linkRoute === pathName ? theme.palette.primary.main : theme.palette.secondary[100],
                      }}
                    >
                      {item.icon && ICONS[item.icon] ? React.createElement(ICONS[item.icon]) : null}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="caption"
                          sx={{
                            color: item.linkRoute === pathName ? theme.palette.primary.main : theme.palette.secondary[100],
                            // fontWeight: item.linkRoute === pathName ? 600 : 550,
                          }}
                        >
                          {item.text}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </>
          )}
          {extraListItems &&
            extraListItems.map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{
                  pl: 0,
                  backgroundColor: item.linkRoute === pathName ? 'secondary.main' : 'transparent',
                  // '&:hover': {
                  //   backgroundColor: item.linkRoute === pathName ? 'secondary.main' : 'grey.100',
                  // },
                }}
              >
                <ListItemButton onClick={() => sideBarListItemOnClick(item.linkRoute)}>
                  <ListItemIcon
                    sx={{
                      mr: 2,
                      color: item.linkRoute === pathName ? theme.palette.primary.main : 'text.primary',
                    }}
                  >
                    {item.icon && ICONS[item.icon] ? React.createElement(ICONS[item.icon]) : null}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="caption"
                        sx={{
                          color: item.linkRoute === pathName ? theme.palette.primary.main : 'text.primary',
                          // fontWeight: item.linkRoute === pathName ? 600 : 550,
                        }}
                      >
                        {item.text}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          {/* The below list will be used for the  report org info edit etc for organisation or for the assessor */}
        </Box>
        {/* Main menu to add the edit preview and the reports to view also the org info*/}
        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            alignSelf: 'flex-start',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            ml: 2,
          }}
        >
          <Box
            component="img"
            src="/elansolLogo.png"
            alt="Elansol Logo"
            sx={{
              maxWidth: '120px',
              height: 'auto',
            }}
          />
          <Typography variant="caption" color="text.secondary">
            v1.0.0
          </Typography>
        </Box>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>{children}</Box>
      </Main>
    </Box>
  );
}
