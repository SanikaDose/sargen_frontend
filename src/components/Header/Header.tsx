import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Stack,
  Button,
  useMediaQuery,
  useTheme,
  Popover,
} from '@mui/material';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isMobile) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <AppBar position="static" color="primary" elevation={4} sx={{ background: '#10557C' }}>
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
            {/* Shown only on non-mobile */}
            {!isMobile && (
              <Stack direction="column" alignItems="flex-end" spacing={0} mr={2}>
                <Typography variant="body1" fontWeight="bold" color="inherit">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="inherit">
                  {user.designation}
                </Typography>
              </Stack>
            )}

            <Button variant="text" onClick={handleAvatarClick}>
              <Avatar alt={user.name} src={user.avatarUrl} />
            </Button>

            {/* Popover shown only on mobile */}
            {isMobile && (
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <Box px={2} py={1}>
                  <Typography variant="body1" fontWeight="bold">
                    {user.name}
                  </Typography>
                  <Typography variant="body2">{user.designation}</Typography>
                </Box>
              </Popover>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
