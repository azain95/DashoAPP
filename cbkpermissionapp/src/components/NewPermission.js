// src/components/NewPermission.js
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Typography, FormControl, MenuItem, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { format, formatISO, isValid, differenceInMinutes } from 'date-fns';
import useAuthGuard from '../hooks/useAuthGuard';

import axios from '../utils/axiosInstance';
import {
  PageContainer,
  ContentCard,
  FormSection,
  ActionBar,
} from './styled/Layout';
import {
  StyledTextField,
  StyledSelect,
  PrimaryButton,
} from './styled/Forms';

function NewPermission() {
  useAuthGuard();

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

  const closeNote = () =>
    setNotification((s) => ({ ...s, open: false }));

  const getUser = () => {
    try {
      const raw = Cookies.get('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const combineDateTime = (d, t) => {
    const D = new Date(d);
    const T = new Date(t);
    return new Date(
      D.getFullYear(),
      D.getMonth(),
      D.getDate(),
      T.getHours(),
      T.getMinutes(),
      0,
      0
    );
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const user = (() => {
    try {
      const raw = Cookies.get('user');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  })();

  if (!user?.user_id) {
    setNotification({ open: true, message: 'Session missing. Please sign in again.', severity: 'error' });
    return;
  }

  const startDT = new Date(startDate);
  startDT.setHours(new Date(startTime).getHours(), new Date(startTime).getMinutes(), 0, 0);

  const endDT = new Date(endDate);
  endDT.setHours(new Date(endTime).getHours(), new Date(endTime).getMinutes(), 0, 0);

  const formattedStartDate = format(startDT, 'yyyy-MM-dd');
  const formattedEndDate   = format(endDT,   'yyyy-MM-dd');
  const formattedStartTime = format(startDT, 'HH:mm');
  const formattedEndTime   = format(endDT,   'HH:mm');

  if (formattedEndDate < formattedStartDate ||
      (formattedEndDate === formattedStartDate && formattedEndTime <= formattedStartTime)) {
    setNotification({ open: true, message: 'End time must be after start time.', severity: 'error' });
    return;
  }

  const payload = {
    req_datetime: new Date().toISOString(),
    req_type: reqType,                  // 'permission' or 'swap' as your backend expects
    date_from: formattedStartDate,      // 'YYYY-MM-DD'
    date_to:   formattedEndDate,        // 'YYYY-MM-DD'
    time_from: formattedStartTime,      // 'HH:mm'
    time_to:   formattedEndTime,        // 'HH:mm'
    user_id:   user.user_id,            // backend INSERT expects this
    reason:    reason.trim(),
    // DON'T send attachment here
  };

  try {
    await axios.post('/requests', payload); // axiosInstance will add Authorization
    setStartDate(new Date()); setStartTime(new Date());
    setEndDate(new Date());   setEndTime(new Date());
    setReason('');
    setNotification({ open: true, message: 'Request submitted successfully!', severity: 'success' });
  } catch (err) {
    console.error('Submit error:', err?.response?.status, err?.response?.data);
    const msg = err?.response?.data?.error || err?.response?.data?.message || 'Error creating permission request';
    setNotification({ open: true, message: `Error submitting request: ${msg}`, severity: 'error' });
  }
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
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(v) => v && setStartDate(v)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </FormControl>

              <FormControl fullWidth>
                <TimePicker
                  label="Start Time"
                  value={startTime}
                  onChange={(v) => v && setStartTime(v)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </FormControl>

              <FormControl fullWidth>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(v) => v && setEndDate(v)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </FormControl>

              <FormControl fullWidth>
                <TimePicker
                  label="End Time"
                  value={endTime}
                  onChange={(v) => v && setEndTime(v)}
                  slotProps={{ textField: { fullWidth: true } }}
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
                <PrimaryButton type="submit" variant="contained" size="large">
                  Submit Request
                </PrimaryButton>
              </ActionBar>
            </FormSection>
          </form>
        </ContentCard>

        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={closeNote}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={closeNote} severity={notification.severity} variant="filled" sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>
      </PageContainer>
    </LocalizationProvider>
  );
}

export default NewPermission;
