// src/components/Navbar.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom';

import {Typography } from '@mui/material';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Box, Switch, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Link as MuiLink } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HistoryIcon from '@mui/icons-material/History';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PersonIcon from '@mui/icons-material/Person'; // <--- ADD THIS IMPORT
import { styled } from '@mui/material/styles';
import { LogoContainer } from './styled/Logo';
import logo from '../logo.png';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light'
    ? 'rgba(255, 255, 255, 0.72)'
    : 'rgba(28, 28, 30, 0.72)',
  backdropFilter: 'blur(20px)',
  borderBottom: `1px solid ${theme.palette.mode === 'light'
    ? 'rgba(0, 0, 0, 0.1)'
    : 'rgba(255, 255, 255, 0.1)'}`,
  color: theme.palette.text.primary,
}));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  padding: '8px 16px',
  borderRadius: 8,
  transition: theme.transitions.create(['background-color', 'color']),
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light'
      ? 'rgba(0, 0, 0, 0.04)'
      : 'rgba(255, 255, 255, 0.08)',
  },
  '&.active': {
    backgroundColor: theme.palette.primary.main,
    color: '#FFFFFF',
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: 8,
  margin: '4px 8px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light'
      ? 'rgba(0, 0, 0, 0.04)'
      : 'rgba(255, 255, 255, 0.08)',
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

function Navbar({ darkMode, toggleDarkMode, handleSignOut }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'New Permission', icon: <AddCircleOutlineIcon />, path: '/newpermission' },
    { text: 'Permission History', icon: <HistoryIcon />, path: '/permissionhistory' },
    { text: 'New Leave', icon: <AddCircleOutlineIcon />, path: '/newleave' },
    { text: 'Leave History', icon: <HistoryIcon />, path: '/leavehistory' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' }, // <--- ADD THIS LINE
  ];

  const drawer = (
    <Box>
      <DrawerHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <LogoContainer size="small">
            <img src={logo} alt="Logo" />
          </LogoContainer>
          <Typography variant="h6" component="div">
            DASHO
          </Typography>
        </Box>
      </DrawerHeader>
      <Box sx={{ mt: 2 }}>
        <List>
          {menuItems.map((item) => (
            <StyledListItem
              button
              key={item.text}
              component={NavLink}
              to={item.path}
              onClick={() => isMobile && handleDrawerToggle()}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </StyledListItem>
          ))}
          <StyledListItem>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <DarkModeIcon />
            </ListItemIcon>
            <ListItemText primary="Dark Mode" />
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              color="primary"
            />
          </StyledListItem>
          <StyledListItem button onClick={handleSignOut}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </StyledListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <StyledAppBar position="sticky" elevation={0}>
        <Toolbar>
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: isMobile ? 1 : 0 }}>
            <LogoContainer size="small">
              <img src={logo} alt="Logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
            </LogoContainer>
            {!isMobile && (
              <Typography variant="h6" component="div">
                DASHO
              </Typography>
            )}
          </Box>
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 4, flexGrow: 1 }}>
              {menuItems.map((item) => (
                <StyledNavLink
                  key={item.text}
                  to={item.path}
                >
                  {item.text}
                </StyledNavLink>
              ))}
            </Box>
          )}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DarkModeIcon sx={{ mr: 1 }} />
                <Switch
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  color="primary"
                />
              </Box>
              <IconButton color="inherit" onClick={handleSignOut}>
                <ExitToAppIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </StyledAppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Navbar;