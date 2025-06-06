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
import {
  PageContainer,
  ContentCard,
  FormSection,
  ActionBar,
} from './styled/Layout';
import {
  StyledTextField,
  StyledSelect,
  StyledDatePicker,
  StyledTimePicker,
  PrimaryButton,
} from './styled/Forms';

function NewPermission() {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [reason, setReason] = useState('');
  const [reqType, setReqType] = useState('permission');
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(Cookies.get('user'));

    const formattedStartTime = format(startTime, 'HH:mm');
    const formattedEndTime = format(endTime, 'HH:mm');

    if (formattedStartTime === 'Invalid Date' || formattedEndTime === 'Invalid Date') {
      setNotification({
        open: true,
        message: 'Please select valid start and end times',
        severity: 'error',
      });
      return;
    }

    if (!user) {
      console.error('User object is undefined');
      return;
    }

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

    const token = Cookies.get('token');

    try {
      await axios.post('https://api.dashoprojects.com/requests', permission, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <PageContainer>
        <ContentCard>
          <Typography variant="h4" gutterBottom>
            New Permission Request
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormSection>
              <FormControl fullWidth>
                <InputLabel id="request-type-label">Request Type</InputLabel>
                <StyledSelect
                  labelId="request-type-label"
                  value={reqType}
                  onChange={(e) => setReqType(e.target.value)}
                  label="Request Type"
                >
                  <MenuItem value="permission">Permission</MenuItem>
                  <MenuItem value="swap">Swap</MenuItem>
                </StyledSelect>
              </FormControl>

              <FormControl fullWidth>
                <StyledDatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={setStartDate}
                  renderInput={(params) => <StyledTextField {...params} />}
                />
              </FormControl>

              <FormControl fullWidth>
                <StyledTimePicker
                  label="Start Time"
                  value={startTime}
                  onChange={setStartTime}
                  renderInput={(params) => <StyledTextField {...params} />}
                />
              </FormControl>

              <FormControl fullWidth>
                <StyledDatePicker
                  label="End Date"
                  value={endDate}
                  onChange={setEndDate}
                  renderInput={(params) => <StyledTextField {...params} />}
                />
              </FormControl>

              <FormControl fullWidth>
                <StyledTimePicker
                  label="End Time"
                  value={endTime}
                  onChange={setEndTime}
                  renderInput={(params) => <StyledTextField {...params} />}
                />
              </FormControl>

              <StyledTextField
                label="Reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                multiline
                rows={4}
                required
              />

              <ActionBar>
                <PrimaryButton
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Submit Request
                </PrimaryButton>
              </ActionBar>
            </FormSection>
          </form>
        </ContentCard>

        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={notification.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </PageContainer>
    </LocalizationProvider>
  );
}

export default NewPermission;