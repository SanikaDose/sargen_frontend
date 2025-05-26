import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box, Stack, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
  user?: {
    name: string;
    designation: string;
    avatarUrl?: string;
  };
}

export const Header: React.FC<HeaderProps> = ({ title, onMenuClick, user }) => {
  return (
    <AppBar position="static" color="primary" elevation={4} sx={{ background: '#10557C', borderRadius: '2px' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>

        {user && (
          <Box display="flex" alignItems="center">
            <Stack direction="column" alignItems="flex-end" spacing={0} mr={2}>
              <Typography variant="body1" fontWeight="bold" color="inherit">
                {user.name}
              </Typography>
              <Typography variant="body2" color="inherit">
                {user.designation}
              </Typography>
            </Stack>
            <Button variant="outlined">
              <Avatar alt={user.name} src={user.avatarUrl} />
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
