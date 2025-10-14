// src/components/ShiftSchedule.js
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import Cookies from 'js-cookie';
import axios from '../utils/axiosInstance';
import useAuthGuard from '../hooks/useAuthGuard';

import { PageContainer, ContentCard } from './styled/Layout';

function ShiftSchedule() {
  useAuthGuard();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedules, setSchedules] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(''); // For future unit filtering
  const [units, setUnits] = useState([]); // For future unit dropdown
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(Cookies.get('user'));

  useEffect(() => {
    const fetchSchedules = async () => {
      if (!currentUser) return;

      setLoading(true);
      try {
        const token = Cookies.get('token');
        const monthStart = format(startOfMonth(selectedDate), 'yyyy-MM-dd');
        const monthEnd = format(endOfMonth(selectedDate), 'yyyy-MM-dd');

        // You'll need an API endpoint to fetch schedules for a user within a date range.
        // For admin/leader, you might fetch all schedules for a unit.
        const endpoint = `/schedules/user/${currentUser.user_id}?start_date=${monthStart}&end_date=${monthEnd}`;
        // If 'is_admin' or 'is_leader' from user object, you could fetch for a unit:
        // const endpoint = `/schedules/unit/${selectedUnit}?start_date=${monthStart}&end_date=${monthEnd}`;

        const response = await axios.get(`https://api.dashoprojects.com${endpoint}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSchedules(response.data);
      } catch (error) {
        console.error('Error fetching schedules:', error);
        // Handle error, e.g., show a snackbar
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [selectedDate, currentUser]); // Re-fetch when month changes or user changes

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate),
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <PageContainer>
        <ContentCard>
          <Typography variant="h4" gutterBottom>
            My Shift Schedule
          </Typography>
          {/* Unit filter (for future admin/leader view) */}
          {/* {currentUser?.is_admin && (
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Unit</InputLabel>
              <Select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                label="Unit"
              >
                {units.map((unit) => (
                  <MenuItem key={unit.id} value={unit.name}>
                    {unit.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )} */}

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <DateCalendar
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              views={['month', 'year']}
              sx={{ width: '100%', maxWidth: 700 }}
            />
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>
            Shifts for {format(selectedDate, 'MMMM yyyy')}
          </Typography>

          {loading ? (
            <Typography>Loading schedules...</Typography>
          ) : (
            <Grid container spacing={2}>
              {daysInMonth.map((day) => {
                const shift = schedules.find((s) =>
                  isSameDay(new Date(s.shift_date), day)
                );
                return (
                  <Grid item xs={12} sm={6} md={4} key={day.toISOString()}>
                    <ContentCard sx={{ p: 2 }}>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {format(day, 'EEE, MMM d')}
                      </Typography>
                      {shift ? (
                        <Typography variant="body1">
                          Shift: {shift.shift_time} ({shift.unit})
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No shift scheduled
                        </Typography>
                      )}
                    </ContentCard>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </ContentCard>
      </PageContainer>
    </LocalizationProvider>
  );
}

export default ShiftSchedule;