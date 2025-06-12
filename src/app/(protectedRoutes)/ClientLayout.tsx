'use client';

// import { Header } from '@/components/Header/Header';
// import InfoBox from '@/components/InfoBox/InfoBox';

// import theme from '@/theme/theme';
// import { AssessorOnboardingSideBarList } from '../../app/utils/allRoutes';

// import SideBar from '@/components/sideBar/SideBar';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Fab, Grid, useMediaQuery } from '@mui/material';
// import { useEffect, useState } from 'react';

// export default function ClientLayout({ children }: { children: React.ReactNode }) {
//   const [openSideBar, setOpenSideBar] = useState(false);
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // <600
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600–899
//   const isCompactDesktop = useMediaQuery('(min-width:901px) and (max-width:1045px)');
//   console.log(openSideBar);
//   // Check if sidebar should be permanent
//   const isPermanentSidebar = !isMobile && !isTablet && !isCompactDesktop;

//   const [showInfoBox, setShowInfoBox] = useState(false);

//   useEffect(() => {
//     console.log('width:', window.innerWidth);
//   }, []);

//   // Auto-close drawer on mobile/tablet for better UX
//   useEffect(() => {
//     if (isMobile || isTablet) {
//       setOpenSideBar(false);
//     } else if (isPermanentSidebar) {
//       setOpenSideBar(true);
//     }
//   }, [isMobile, isTablet, isPermanentSidebar]);

//   return (

//   );
// }

// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import MailIcon from '@mui/icons-material/Mail';
// import MenuIcon from '@mui/icons-material/Menu';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import { Avatar, Button, useMediaQuery } from '@mui/material';
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import { styled, useTheme } from '@mui/material/styles';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import * as React from 'react';

// const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
//   open?: boolean;
// }>(({ theme }) => ({
//   flexGrow: 1,
//   padding: theme.spacing(3),
//   transition: theme.transitions.create('margin', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   marginLeft: `-${drawerWidth}px`,
//   variants: [
//     {
//       props: ({ open }) => open,
//       style: {
//         transition: theme.transitions.create('margin', {
//           easing: theme.transitions.easing.easeOut,
//           duration: theme.transitions.duration.enteringScreen,
//         }),
//         marginLeft: 0,
//       },
//     },
//   ],
// }));

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })<AppBarProps>(({ theme }) => ({
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   variants: [
//     {
//       props: ({ open }) => open,
//       style: {
//         width: `calc(100% - ${drawerWidth}px)`,
//         marginLeft: `${drawerWidth}px`,
//         transition: theme.transitions.create(['margin', 'width'], {
//           easing: theme.transitions.easing.easeOut,
//           duration: theme.transitions.duration.enteringScreen,
//         }),
//       },
//     },
//   ],
// }));

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));

// export default function ClientLayout({ children }: { children: React.ReactNode }) {
//   const theme = useTheme();
//   // Media queries to detect device type
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // <600px
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600-960px
//   const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // >=960px

//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const open = isDesktop ? true : mobileOpen;

//   const handleDrawerOpen = () => {
//     if (!isDesktop) {
//       setMobileOpen(true);
//     }
//   };

//   const handleDrawerClose = () => {
//     if (!isDesktop) {
//       setMobileOpen(false);
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         open={open}
//         sx={{
//           background: `${theme.palette.background.paper} !important`,
//           boxShadow: 0,
//         }}
//       >
//         <Toolbar>
//           {!isDesktop && (
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               onClick={handleDrawerOpen}
//               edge="start"
//               sx={[
//                 {
//                   mr: 2,
//                 },
//                 (open || isDesktop) && { display: 'none' },
//               ]}
//             >
//               <MenuIcon />
//             </IconButton>
//           )}
//           <Typography sx={{ color: theme.palette.text.primary }} variant="h6" noWrap component="div">
//             Change it to the page name from global state
//           </Typography>

//           <Box display="flex" flexDirection="column" alignItems="flex-end" sx={{ marginLeft: 'auto' }}>
//             <Typography variant="body1" fontWeight="bold" sx={{ color: 'text.primary' }}>
//               Viren Patil
//             </Typography>
//             <Typography variant="body2" sx={{ color: `${theme.palette.text.disabled} !important` }}>
//               Software Engineer
//             </Typography>
//           </Box>
//           <Button variant="text">
//             <Avatar src="https://avatar.iran.liara.run/public/19" />
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//             <ListItem key={text} disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>

//         <Box sx={{ flexGrow: 1 }} />
//         <Box
//           sx={{
//             alignSelf: 'flex-start',
//             mb: 2,
//             display: 'flex',
//             alignItems: 'center',
//             gap: 1,
//           }}
//         >
//           <Box
//             component="img"
//             src="/elansolLogo.png"
//             alt="Elansol Logo"
//             sx={{
//               maxWidth: '120px', // Adjust based on your logo size
//               height: 'auto',
//             }}
//           />
//           <Typography variant="caption" color="text.secondary">
//             v1.0.0
//           </Typography>
//         </Box>
//       </Drawer>
//       <Main open={open}>
//         <DrawerHeader />
//         {children}
//       </Main>
//     </Box>
//   );
// }

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Avatar, Button, useMediaQuery } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';

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

  // Media queries to detect device type
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // <600px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600-960px
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // >=960px

  // For desktop/laptop, sidebar is always open; for mobile/tablet, it's controlled by state
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const open = isDesktop ? true : mobileOpen;

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
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              // Hide menu icon when sidebar is open OR when on desktop
              (open || isDesktop) && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{ color: theme.palette.text.primary }} variant="h6" noWrap component="div">
            Change it to the page name from global state
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
            width: drawerWidth,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
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
              maxWidth: isDesktop ? '100%' : '80%',
              height: 'auto',
              padding: isDesktop ? 0 : 1,
              display: 'block',
              margin: '0 auto',
            }}
          />
          {/* Hide close icon on desktop */}
          {!isDesktop && (
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          )}
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

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
      <Main open={open}>{children}</Main>
    </Box>
  );
}
