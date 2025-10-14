// src/components/NewSwap.js
import React, { useState, useEffect } from 'react';
import { Typography, FormControl, InputLabel, MenuItem, Snackbar, Alert } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, formatISO } from 'date-fns';
import Cookies from 'js-cookie';
import axios from '../utils/axiosInstance';
import useAuthGuard from '../hooks/useAuthGuard';

import { PageContainer, ContentCard, FormSection, ActionBar } from './styled/Layout';
import { StyledTextField, StyledSelect, StyledDatePicker, PrimaryButton } from './styled/Forms';

function NewSwap() {
  useAuthGuard();
  const [targetUser, setTargetUser] = useState('');
  const [shiftDate, setShiftDate] = useState(new Date());
  const [reason, setReason] = useState('');
  const [users, setUsers] = useState([]); // State to store list of users
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    // Fetch list of users for the dropdown
    const fetchUsers = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get('https://api.dashoprojects.com/users', { // Assuming a /users endpoint
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setNotification({
          open: true,
          message: 'Error fetching users for swap. Please try again.',
          severity: 'error',
        });
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = JSON.parse(Cookies.get('user'));

    if (!currentUser || !targetUser || !shiftDate || !reason) {
      setNotification({
        open: true,
        message: 'Please fill in all required fields.',
        severity: 'warning',
      });
      return;
    }

    const swapRequest = {
      requester_id: currentUser.user_id,
      target_id: targetUser,
      shift_date: formatISO(shiftDate, { representation: 'date' }),
      reason: reason,
      status: 'pending',
    };

    const token = Cookies.get('token');

    try {
      await axios.post('https://api.dashoprojects.com/swaps', swapRequest, { // Assuming a /swaps endpoint
        headers: { Authorization: `Bearer ${token}` },
      });

      setTargetUser('');
      setShiftDate(new Date());
      setReason('');

      setNotification({
        open: true,
        message: 'Swap request submitted successfully!',
        severity: 'success',
      });
    } catch (error) {
      console.error(error);
      setNotification({
        open: true,
        message: 'Error submitting swap request. Please try again.',
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
            New Shift Swap Request
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormSection>
              <FormControl fullWidth>
                <InputLabel id="target-user-label">Swap With</InputLabel>
                <StyledSelect
                  labelId="target-user-label"
                  value={targetUser}
                  onChange={(e) => setTargetUser(e.target.value)}
                  label="Swap With"
                  required
                >
                  {users.map((user) => (
                    // Filter out the current user from the list
                    user.user_id !== JSON.parse(Cookies.get('user'))?.user_id && (
                      <MenuItem key={user.user_id} value={user.user_id}>
                        {user.name} ({user.user_id})
                      </MenuItem>
                    )
                  ))}
                </StyledSelect>
              </FormControl>

              <FormControl fullWidth>
                <StyledDatePicker
                  label="Shift Date to Swap"
                  value={shiftDate}
                  onChange={setShiftDate}
                  renderInput={(params) => <StyledTextField {...params} />}
                  required
                />
              </FormControl>

              <StyledTextField
                label="Reason for Swap"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                multiline
                rows={4}
                required
              />

              <ActionBar>
                <PrimaryButton type="submit" variant="contained" size="large">
                  Submit Swap Request
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

export default NewSwap;