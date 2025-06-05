import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import {
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { SideBarProps } from './SideBar.types';

const SideBar: React.FC<SideBarProps> = ({ onCloseTrigger, drawerList = [], drawerType = 'persistent', open }) => {
  return (
    <Drawer
      variant={drawerType}
      open={drawerType === 'permanent' || open} // Always open for permanent, controlled externally for temporary
      onClose={drawerType === 'temporary' ? onCloseTrigger : undefined}
      sx={{
        display: { sm: 'block' },
        // Remove width from the main Drawer - let MuiDrawer-paper handle it
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: {
            xs: drawerType === 'temporary' ? '100vw' : 180, // Full width for temporary on mobile
            sm: drawerType === 'temporary' ? '100vw' : 180, // Full width for temporary on tablet
            md: drawerType === 'temporary' ? '100vw' : 280, // Full width for temporary on compact desktop
            lg: 200,
            xl: 220,
          },
          boxSizing: 'border-box',
          // Ensure temporary drawers cover full height
          ...(drawerType === 'temporary' && {
            height: '100vh',
            zIndex: 1200,
          }),
        },
      }}
      // Better performance for temporary drawers
      ModalProps={
        drawerType === 'temporary'
          ? {
              keepMounted: true,
            }
          : undefined
      }
    >
      <Grid container direction="column" sx={{ height: '100%', flexWrap: 'nowrap' }}>
        {/* Header Section */}
        <Grid>
          <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
            <IconButton onClick={() => onCloseTrigger}>
              <ChevronLeftIcon />
            </IconButton>
          </Box>
        </Grid>

        {/* Main Content Section */}
        <Grid sx={{ overflow: 'auto', flexGrow: 1 }}>
          <Box>
            <List>
              {drawerList.map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        {/* Footer Section */}
        <Grid>
          <Divider />
        </Grid>
        <Grid container sx={{ p: 1 }}>
          {/* Logo */}
          <Grid size={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src="/elansolLogo.png"
              alt="Elansol Logo"
              sx={{
                width: {
                  xs: drawerType === 'temporary' ? 80 : 40, // Larger for full-screen temporary
                  sm: drawerType === 'temporary' ? 120 : 60,
                  md: 60,
                  lg: 80,
                  xl: 100,
                },
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.2))',
              }}
            />
          </Grid>

          {/* Version Text */}
          <Grid size={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemText
              secondary="v1.0.0"
              sx={{
                '& .MuiListItemText-secondary': {
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                },
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default SideBar;
