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
import { SideBarProps } from './SideBar.d';

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
        '& .MuiDrawer-paper': {
          width: '20%',
          height: '100%',
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
        <Grid container direction="row" spacing={1} padding={2}>
          <Grid size={{ xs: 12, md: 6 }} border={3}>
            <img src="/elansolLogo.png" alt="App Icon" width={100} height={50} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} textAlign="center">
            <ListItemText
              secondary="Version 1.0.0"
              slotProps={{
                secondary: {
                  sx: {
                    fontSize: {
                      xs: '12px', // Small on mobile
                      md: '20px', // Larger on desktop
                    },
                  },
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
