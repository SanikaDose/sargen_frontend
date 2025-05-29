import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Popover,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';

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
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(min-width:600px) and (max-width:900px)');

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
    <AppBar position="static" elevation={4} sx={{ background: theme.palette.background.paper }}>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          '&.MuiToolbar-root': {
            height: 48,
            maxHeight: 48,
          },
        }}
      >
        <Box display="flex" alignItems="center">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{ mr: 2, display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" color={theme.palette.text.primary}>
            {title}
          </Typography>
        </Box>

        {user && (
          <Box display="flex" alignItems="center">
            {/* Shown only on non-mobile */}
            {!isMobile && !isTablet && (
              <Stack direction="column" alignItems="flex-end" spacing={0} mr={2}>
                <Typography variant="body1" fontWeight="bold" sx={{ color: 'text.primary' }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.disabled }}>
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
                  <Typography variant="body1" fontWeight="bold" sx={{ color: 'text.primary' }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: `${theme.palette.text.disabled} !important` }}>
                    {user.designation}
                  </Typography>
                </Box>
              </Popover>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
