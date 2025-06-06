// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Cookies from 'js-cookie';
import axios from 'axios';

// Import components
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import NewPermission from './components/NewPermission';
import PermissionHistory from './components/PermissionHistory';
import NewLeave from './components/NewLeave';
import LeaveHistory from './components/LeaveHistory';

// Import theme
import { lightTheme, darkTheme } from './styles/theme';

function App() {
  // Set darkMode to true by default
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }

    // Load dark mode preference from localStorage, default to true if not set
    const savedDarkMode = localStorage.getItem('darkMode');
    setDarkMode(savedDarkMode === null ? true : savedDarkMode === 'true');
  }, []);

  const handleSignIn = async (username, password) => {
    try {
      const response = await axios.post('https://api.dashoprojects.com/signin', {
        user_id: username,
        password,
      });
      if (response.data.token) {
        Cookies.set('token', response.data.token);
        Cookies.set('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
      } else {
        throw new Error('Failed to sign in');
      }
    } catch (error) {
      throw new Error('Error signing in');
    }
  };

  const handleSignUp = async (credentials) => {
    try {
      const response = await axios.post('https://api.dashoprojects.com/signup', credentials);
      if (response.data.token) {
        Cookies.set('token', response.data.token);
        Cookies.set('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const handleSignOut = () => {
    Cookies.remove('user');
    Cookies.remove('token');
    setUser(null);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    // Save dark mode preference to localStorage
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Router>
          {user && (
            <Navbar
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              handleSignOut={handleSignOut}
            />
          )}
          <Routes>
            {user ? (
              <>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/newpermission" element={<NewPermission />} />
                <Route path="/permissionhistory" element={<PermissionHistory />} />
                <Route path="/newleave" element={<NewLeave />} />
                <Route path="/leavehistory" element={<LeaveHistory />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path="/signin" element={<SignIn handleSignIn={handleSignIn} />} />
                <Route path="/signup" element={<SignUp handleSignUp={handleSignUp} />} />
                <Route path="*" element={<Navigate to="/signin" />} />
              </>
            )}
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
