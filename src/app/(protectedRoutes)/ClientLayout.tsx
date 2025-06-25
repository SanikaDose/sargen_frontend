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
import { useParams, usePathname, useRouter } from 'next/navigation';
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
import { setPlantAssessmentDepartment } from './(plantAssessment)/plantAssementSlice';

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
  // ALL HOOKS MUST BE CALLED AT THE TOP LEVEL - NO CONDITIONALS
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const pathName = usePathname();
  const params = useParams();
  // console.log('params', params.plantId);

  // Media queries
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // All useState hooks
  const [tenantId, setTenantId] = React.useState<string | null>(null);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [decodedToken, setDecodedToken] = React.useState<Token | null>(null);

  // All useSelector hooks
  const onboardingStatus: string = useSelector((state: RootState) => state.tokenDecode.onboardingStatus) || '';
  const userTypeFromRedux = useSelector((state: RootState) => state.tokenDecode.decodedToken?.userType);
  const sideBarListItems: SidebarItem[] = useSelector((state: RootState) => state.global.SideBarListItem);
  const sideBarListItemsForAssessment: SidebarItem[] = useSelector((state: RootState) => state.global.sideBarListItemsForAssessment);
  const extraListItems: SidebarItem[] = useSelector((state: RootState) => state.global.extraListItems);
  const showAssessmentListSideBar = useSelector((state: RootState) => state.global.showAssessmentListSideBar);
  const pageNameHeader: string = useSelector((state: RootState) => state.global.pageNameHeader);
  const currentDepartment = useSelector((state: RootState) => state.plantAssessmentGlobal.questionnairesDeparment);

  // Derived values
  const open = isDesktop ? true : mobileOpen;

  const plantId = (params?.plantId ?? params?.PlantId) as string;

  const userTypeFromLocalStorage = decodedToken?.userType;
  const userType = userTypeFromRedux || userTypeFromLocalStorage;

  // Initialize component with localStorage values
  React.useEffect(() => {
    const token = localStorage.getItem('Authorization');
    const storedTenantId = getValueLocalStorage('tenantId');

    console.log('token:', token);
    console.log('storedTenantId:', storedTenantId);

    if (token) {
      const decoded: Token = jwtDecode(token);
      setDecodedToken(decoded);
    }

    if (!token) {
      router.push('login');
    }
    if (storedTenantId && userType && userType[0] === 'PLATFORMUSER') {
      setTenantId(storedTenantId);
      setIsInitialized(true);
      return;
    }
    if (storedTenantId && userType && userType[0] === 'ASSESSOR') {
      setTenantId((params.OrganisationId ?? params.organisationId) as string);
      setIsInitialized(true);
    }
  }, [router]);
  console.log('assessor id', tenantId);
  console.log('userType', userType);
  console.log('params', params);

  // Set sidebar items based on onboarding status and user type
  React.useEffect(() => {
    if (!userType || !onboardingStatus) return;

    if (onboardingStatus === OnboardingStatus.NOT_STARTED || onboardingStatus === OnboardingStatus.STARTED) {
      if (userType[0] === UserType.PLATFORMUSER) {
        dispatch(setSideBarListItem(organisationOnboardingMenuList));
      } else if (userType[0] === UserType.ASSESSOR) {
        dispatch(setSideBarListItem(assessorOnboardingMenuList));
      }
    } else if (onboardingStatus === OnboardingStatus.COMPLETED) {
      if (userType[0] === UserType.PLATFORMUSER) {
        dispatch(setSideBarListItem(organisationOnboardedMenuList));
        dispatch(setExtraListItems(organisationExtraMenuList));
      } else if (userType[0] === UserType.ASSESSOR) {
        dispatch(setSideBarListItem(assessorOnboardedMenuList));
        dispatch(setExtraListItems(assessorExtraList));
      }
    }
  }, [userType, onboardingStatus, dispatch]);

  // Set assessment list items
  React.useEffect(() => {
    if (onboardingStatus === OnboardingStatus.COMPLETED && showAssessmentListSideBar && userType) {
      if (userType[0] === UserType.PLATFORMUSER) {
        dispatch(setSideBarListItemsForAssessment(platformUserAssessmentList));
      } else if (userType[0] === UserType.ASSESSOR) {
        dispatch(setSideBarListItemsForAssessment(assessorUserAssessmentList));
      }
    }
  }, [onboardingStatus, userType, showAssessmentListSideBar, dispatch]);

  // Early return if not initialized
  if (!isInitialized) {
    return null;
  }

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

  const DEPARTMENT_LINKS = [
    'R&D',
    'Planning',
    'Production',
    'Quality',
    'Maintenance',
    'Supply Chain - Sales',
    'Supply Chain - Purchase',
    'Finance',
    'Utilities',
    'IT',
    'Learning & Development',
    'Management',
    'HR',
  ];

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
  console.log('tenantId and plant id ', tenantId);

  console.log('plantId', plantId);

  const assementSideBarListItemOnClick = (link: string) => {
    console.log('link', link);
    const isDepartment = DEPARTMENT_LINKS.includes(link);

    // ✅ Set department if applicable
    if (isDepartment) {
      dispatch(setPlantAssessmentDepartment(link));
    }

    // ✅ Determine navigation path
    let navigationPath = '';

    if (isDepartment) {
      if (tenantId && plantId) {
        navigationPath = `/Questionaire/${tenantId}/${plantId}`;
      }
    } else {
      if (tenantId && plantId) {
        navigationPath = `${link}/${tenantId}/${plantId}`;
      } else {
        navigationPath = `${link}`;
      }
    }
    console.log('navigationPath', navigationPath);

    router.push(navigationPath);

    // ✅ Update sidebar state
    const updatedList = sideBarListItems.map((item) => ({
      ...item,
      isActive: item.linkRoute === link,
    }));

    dispatch(setSideBarListItem(updatedList));
  };
  console.log('tenantId', tenantId);
  console.log('plantID', plantId);

  console.log('userType', userType);
  console.log('sideBarListItemsForAssessment', sideBarListItemsForAssessment);

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
          {showAssessmentListSideBar && onboardingStatus === OnboardingStatus.COMPLETED && (
            <>
              <Typography sx={{ pl: 2, pt: 2, fontWeight: 'bold' }} variant="subtitle2">
                Assessment menu
              </Typography>
              {sideBarListItemsForAssessment.map((item) => {
                // Check if the current pathname contains the matchKeyword
                const activeSegment = pathName.split('/')[1]?.toLowerCase();
                const isDepartment = !item.linkRoute.startsWith('/');

                const isActive = isDepartment
                  ? item.linkRoute?.toLowerCase() === currentDepartment?.toLowerCase()
                  : activeSegment === item.matchKeyword?.toLowerCase();
                return (
                  <ListItem
                    key={item.text}
                    disablePadding
                    sx={{
                      pl: 0,
                      backgroundColor: isActive ? 'secondary.main' : 'transparent',
                    }}
                  >
                    <ListItemButton onClick={() => assementSideBarListItemOnClick(item.linkRoute)}>
                      <ListItemIcon
                        sx={{
                          mr: 2,
                          color: isActive ? theme.palette.primary.main : theme.palette.secondary[100],
                        }}
                      >
                        {item.icon && ICONS[item.icon] ? React.createElement(ICONS[item.icon]) : null}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="caption"
                            sx={{
                              color: isActive ? theme.palette.primary.main : theme.palette.secondary[100],
                            }}
                          >
                            {item.text}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </>
          )}
          {/* 
          {showAssessmentListSideBar && onboardingStatus === OnboardingStatus.COMPLETED && userType[0] === UserType.ASSESSOR && (
            <>
              <Typography sx={{ pl: 2, pt: 2, fontWeight: 'bold' }} variant="subtitle2">
                Assessment menu
              </Typography>
              {sideBarListItemsForAssessment.map((item) => {
                // Check if the current pathname contains the matchKeyword
                const activeSegment = pathName.split('/')[1]?.toLowerCase();
                const isDepartment = !item.linkRoute.startsWith('/');

                const isActive = isDepartment
                  ? item.linkRoute?.toLowerCase() === currentDepartment?.toLowerCase()
                  : activeSegment === item.matchKeyword?.toLowerCase();
                return (
                  <ListItem
                    key={item.text}
                    disablePadding
                    sx={{
                      pl: 0,
                      backgroundColor: isActive ? 'secondary.main' : 'transparent',
                    }}
                  >
                    <ListItemButton onClick={() => assementSideBarListItemOnClick(item.linkRoute)}>
                      <ListItemIcon
                        sx={{
                          mr: 2,
                          color: isActive ? theme.palette.primary.main : theme.palette.secondary[100],
                        }}
                      >
                        {item.icon && ICONS[item.icon] ? React.createElement(ICONS[item.icon]) : null}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="caption"
                            sx={{
                              color: isActive ? theme.palette.primary.main : theme.palette.secondary[100],
                            }}
                          >
                            {item.text}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </>
          )} */}

          {extraListItems &&
            extraListItems.map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{
                  pl: 0,
                  backgroundColor: item.linkRoute === pathName ? 'secondary.main' : 'transparent',
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
                        }}
                      >
                        {item.text}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </Box>
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
        {children}
      </Main>
    </Box>
  );
}
