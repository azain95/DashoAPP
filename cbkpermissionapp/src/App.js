// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, Navigate, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel, TextField, Typography } from '@mui/material';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Link as MuiLink } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { TextareaAutosize } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Link as RouterLink } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css'; // Path to your CSS file
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NewPermission from './components/NewPermission';
import PermissionHistory from './components/PermissionHistory';
import NewLeave from './components/NewLeave';
import LeaveHistory from './components/LeaveHistory';
import logo from './logo.png';
import './App.css';



const theme = createTheme({
  typography: {
    fontFamily: '"Cairo", sans-serif', // Use the "Cairo" font
  },
});


function App() {
  const [darkMode, setDarkMode] = useState(true);
  const userCookie = Cookies.get('user');
  const [user, setUser] = useState(userCookie ? JSON.parse(userCookie) : null);

  const theme = createTheme({
    typography: {
      fontFamily: "'Cairo', sans-serif",
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#4caf50', // Your green color
      },
    },
  });
// Toggle dark mode function
const toggleDarkMode = () => {
  setDarkMode(!darkMode);
};


const handleSignIn = async (username, password) => {
  try {
    const response = await axios.post('http://165.227.148.16:5000/signin', { user_id: username, password });
    if (response.data.token) {
      Cookies.set('token', response.data.token);
      Cookies.set('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
    } else {
      throw new Error('Failed to sign in');
    }
  } catch (error) {
    // You can customize the error message if needed
    throw new Error('Error signing in');
  }
};

  const handleSignUp = async (credentials) => {
    try {
      const response = await axios.post('http://165.227.148.16:5000/signup', credentials);
      if (response.data.token) {
        Cookies.set('token', response.data.token);
        Cookies.set('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
       
     
      }
    } catch (error) {
      // Handle sign-up error
      console.error('Error signing up:', error);
      
    }
  };
  

  const handleSignOut = () => {
    Cookies.remove('user');
    Cookies.remove('token');
    setUser(null);
    navigate('/signin'); // Redirect to sign-in page
  };



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
          <header className="App-header">
            <img src={logo} className="rotate-logo" alt="logo" />
            <h1 variant="h6" style={{ flexGrow: 1 }}>
              DASHO Leaves and Permissions App
            </h1>
          </header>
          <Routes>
            {user ? (
              <Route
                path="/*"
                element={
                  <div className="container">
                    <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} handleSignOut={handleSignOut} />
                    <Routes>
                      <Route path="/newpermission" element={<NewPermission />} />
                      <Route path="/permissionhistory" element={<PermissionHistory />} />
                      <Route path="/newleave" element={<NewLeave />} />
                      <Route path="/leavehistory" element={<LeaveHistory />} />
                      <Route path="/" element={<Home user={user} />} />
                    </Routes>
                  </div>
                }
              />
            ) : (
              <>
               <Route path="/signin" element={<SignIn handleSignIn={handleSignIn} />} />

                {/* <Route path="/signup" element={<SignUp handleSignUp={handleSignUp} />} /> */}
                <Route path="/*" element={<Navigate to="/signin" />} />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}
export default App;
