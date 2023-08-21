// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';

import {Typography } from '@mui/material';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Link as MuiLink } from '@mui/material';



function Navbar({ darkMode, toggleDarkMode , handleSignOut }) {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
    const handleDrawerToggle = () => {
      setDrawerOpen(!drawerOpen);
    };
  
    const NavList = () => (
      <List>
           <ListItem button component={NavLink} to="/" activeClassName="active">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={NavLink} to="/newpermission" activeClassName="active">
          <ListItemText primary="New Permission" />
        </ListItem>
        <ListItem button component={NavLink} to="/permissionhistory" activeClassName="active">
          <ListItemText primary="Permissions History" />
        </ListItem>
        <ListItem button component={NavLink} to="/newleave" activeClassName="active">
          <ListItemText primary="New Leave" />
        </ListItem>
        <ListItem button component={NavLink} to="/leavehistory" activeClassName="active">
          <ListItemText primary="Leave History" />
        </ListItem>
        <ListItem button onClick={handleSignOut} component={NavLink} to="/signin" activeClassName="active">
          <ListItemText primary="Logout" />
        </ListItem>
        <ListItem button onClick={toggleDarkMode}>
          <ListItemText primary={darkMode ? 'Light Mode' : 'Dark Mode'} />
        </ListItem>
        
      </List>
    );
  
    return (
      <AppBar position="static" className="navbar">
        <Toolbar className="navbar">
          {isMobile ? (
            <>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                Leave and Permission Management
              </Typography>
              <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                <NavList />
              </Drawer>
            </>
          ) : (
            <>
    
              <Button color="inherit" component={NavLink} to="/" activeClassName="active">Home</Button>
              <Button color="inherit" component={NavLink} to="/newpermission" activeClassName="active">New Permission</Button>
    
           <Button color="inherit" component={NavLink} to="/permissionhistory" activeClassName="active">Permissions History</Button>
           <Button color="inherit" component={NavLink} to="/newleave" activeClassName="active">New Leave</Button>
           <Button color="inherit" component={NavLink} to="/leavehistory" activeClassName="active">Leave History</Button>
           <Button color="inherit" onClick={handleSignOut} component={NavLink} to="/signin" activeClassName="active">Logout  </Button>
           
              <Button color="inherit" onClick={toggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    );
  }

  export default Navbar