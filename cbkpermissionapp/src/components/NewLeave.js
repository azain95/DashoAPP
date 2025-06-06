// App.js
import React, { useState } from 'react';
import {
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, formatISO } from 'date-fns';
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
import Cookies from 'js-cookie';
import axios from '../utils/axiosInstance'; // adjust the path based on your file structure
import useAuthGuard from '../hooks/useAuthGuard'; 


function NewLeave() {
    useAuthGuard();
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [reason, setReason] = useState('');
  const [leaveType, setLeaveType] = useState('annual');
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

    const leave = {
      req_datetime: new Date().toISOString(),
      req_type: leaveType,
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
      await axios.post('https://api.dashoprojects.com/requests', leave, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStartDate(new Date());
      setStartTime(new Date());
      setEndDate(new Date());
      setEndTime(new Date());
      setReason('');
      setLeaveType('annual');

      setNotification({
        open: true,
        message: 'Leave request submitted successfully!',
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
            New Leave Request
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormSection>
              <FormControl fullWidth>
                <InputLabel id="leave-type-label">Leave Type</InputLabel>
                <StyledSelect
                  labelId="leave-type-label"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  label="Leave Type"
                >
                  <MenuItem value="annual">Annual Leave</MenuItem>
                  <MenuItem value="sick">Sick Leave</MenuItem>
                  <MenuItem value="emergency">Emergency Leave</MenuItem>
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

export default NewLeave;