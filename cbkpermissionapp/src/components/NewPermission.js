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
import { formatISO } from 'date-fns';


function NewPermission() {
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date()); // Initialize with a Date object
    const [endDate, setEndDate] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date()); // Initialize with a Date object
    const [reason, setReason] = useState('');
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
    const [reqType, setReqType] = useState('permission'); // New state to store request type
  
  
  
    useEffect(() => {
      const userData = Cookies.get('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const user = JSON.parse(Cookies.get('user'));
  
          // Format the time values
          const formattedStartTime = format(startTime, 'HH:mm');
          const formattedEndTime = format(endTime, 'HH:mm');
  
              // Check if time is selected
      if (formattedStartTime === 'Invalid Date' || formattedEndTime === 'Invalid Date') {
        setNotification({
          open: true,
          message: 'Please select a valid start and end time.',
          severity: 'error',
        });
        return;
      }
    
      // Check that the user object exists before attempting to access its properties
      if (!user) {
        console.error('User object is undefined');
        return;
      }
    
      // Log the user object to the console
      console.log('User object:', user);
    
       const permission = {
        req_datetime: new Date().toISOString(),
        req_type: reqType, 
        date_from: formatISO(startDate, { representation: 'date' }),
        date_to: formatISO(endDate, { representation: 'date' }),
        time_from: formattedStartTime,
        time_to: formattedEndTime,
        user_id: user.user_id,
        reason: reason,
        status: 'pending',
      };
    
      // Retrieve the token from cookies
      const token = Cookies.get('token');
    
      try {
        const response = await axios.post('http://165.227.148.16:5000/requests', permission, {
          headers: {
            Authorization: `Bearer ${token}` // Including the token in the Authorization header
          }
        });
        // Clear the form fields
        setStartDate(new Date());
        setStartTime(new Date());
        setEndDate(new Date());
        setEndTime(new Date());
        setReason('');
  
        setNotification({
          open: true,
          message: 'Request submitted successfully!',
          severity: 'success',
        });
      } catch (error) {
        console.error(error);
        setNotification({
          open: true,
          message: 'Error submitting request. Please try again.',
          severity: 'error',
        });
        // Clear the form fields
  setStartDate(new Date());
  setStartTime('12:00');
  setEndDate(new Date());
  setEndTime('12:00');
  setReason('');
      }
    };
    const handleCloseNotification = () => {
      setNotification({ ...notification, open: false });
    };
    return (
      <Container component={Paper} style={{ padding: 20 }}>
        <h2>New Permission</h2>
        <form onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormControl variant="outlined" fullWidth style={{ marginBottom: 15 }}>
              <InputLabel htmlFor="reqType">Request Type</InputLabel>
              <Select
                label="Request Type"
                value={reqType}
                onChange={(e) => setReqType(e.target.value)}
              >
                <MenuItem value="permission">Permission</MenuItem>
                <MenuItem value="swap">Swap</MenuItem>
              </Select>
            </FormControl>
            <InputLabel htmlFor="startDate">Start Date:</InputLabel>
            <FormControl fullWidth style={{ marginBottom: 15 }}>
              <DatePicker selected={startDate} onChange={setStartDate} dateFormat="yyyy-MM-dd" required />
            </FormControl>
            <TimePicker
              label="Start Time"
              value={startTime}
              onChange={setStartTime}
              renderInput={(params) => <TextField {...params} fullWidth required />}
            />
            <InputLabel htmlFor="endDate">End Date:</InputLabel>
            <FormControl fullWidth style={{ marginBottom: 15, marginTop: 15 }}>
              <DatePicker selected={endDate} onChange={setEndDate} dateFormat="yyyy-MM-dd" required />
            </FormControl>
            <TimePicker
              label="End Time"
              value={endTime}
              onChange={setEndTime}
              renderInput={(params) => <TextField {...params} fullWidth required />}
            />
            <TextField label="Reason" value={reason} onChange={(e) => setReason(e.target.value)} fullWidth required multiline rows={4} style={{ marginTop: 15 }} />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>Submit</Button>
          </LocalizationProvider>
        </form>
        <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
          <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>
      </Container>
    );
  }

  
  export default NewPermission