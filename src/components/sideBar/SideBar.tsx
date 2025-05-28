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
// Note: Changed import for v7
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import { useState } from 'react';
import { SideBarProps } from './SideBar.types';

const SideBar: React.FC<SideBarProps> = ({
  onCloseTrigger,
  open = true,
  drawerList = [],
  drawerType = 'persistent',
}) => {
  const [openDrawer, setOpenDrawer] = useState(open);

  return (
    <Drawer
      variant={drawerType}
      sx={{
        display: { sm: 'block' },
        '& .MuiDrawer-paper': {},
        width: {
          xs: 2, // full screen on mobile
          sm: '70vw',
          md: 1,
          lg: 1,
          xl: 1,
        },
      }}
      open={openDrawer}
    >
      <Grid container direction="column" sx={{ height: '100%', flexWrap: 'nowrap' }}>
        {/* Header Section */}
        <Grid>
          {' '}
          {/* Removed 'item' prop as it's not needed in v7 */}
          <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
            <IconButton onClick={() => setOpenDrawer(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </Box>
        </Grid>

        {/* Main Content Section */}
        <Grid sx={{ overflow: 'auto', flexGrow: 1 }}>
          {drawerList.length > 0 ? (
            drawerList
          ) : (
            <Box>
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
          )}
        </Grid>

        {/* Footer Section */}
        <Grid size={12}>
          <Divider />
        </Grid>
        <Grid container>
          {/* Logo */}
          <Grid spacing={1} padding={0.1}>
            <Box
              component="img"
              src="/elansolLogo.png"
              alt="Elansol Logo"
              sx={{
                width: { xs: 10, sm: 120, md: 60 },
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.2))', // Optional for clarity
              }}
            />
          </Grid>

          {/* Version Text */}
          <Grid size={6}>
            <ListItemText secondary="v1.0.0.0.0.0" />
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default SideBar;
