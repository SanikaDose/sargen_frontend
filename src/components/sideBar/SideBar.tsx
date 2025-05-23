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
import { SideBarProps } from './SideBar.d';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import { useState } from 'react';
const SideBar: React.FC<SideBarProps> = ({
  onCloseTrigger,
  open = true,
  drawerList = [],
  drawerType = 'persistent',
}) => {
  const DrawerList1 = (
    <Box sx={{ width: 500 }}>
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
  );
  const [openDrawer, setOpenDrawer] = useState(open);
  return (
    <Grid>
      {/* <Drawer open={open} onClose={() => onCloseTrigger(false)}>
        {drawerList}
      </Drawer> */}

      <Drawer
        variant={drawerType}
        sx={{
          display: { sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box' },
        }}
        open={openDrawer}
      >
        <IconButton onClick={() => setOpenDrawer(false)}>
          <ChevronLeftIcon />
        </IconButton>
        {drawerList}
      </Drawer>
    </Grid>
  );
};

export default SideBar;
