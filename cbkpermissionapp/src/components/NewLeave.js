// App.js
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel, TextField, Typography } from '@mui/material';
import { Button, Link as MuiLink } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';




function NewLeave() {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [leaveType, setLeaveType] = useState("");
    const [reason, setReason] = useState("");
    const [attachment, setAttachment] = useState(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState({ open: false, message: "" });
  
  
    
    const userCookie = Cookies.get('user');
    if (!userCookie) {
      setError("User not authenticated");
      return; // Exit the function if there's no user cookie
    }
  
    const token = Cookies.get('token'); // Retrieve the token from cookies
    if (!token) {
      setError("User token is missing");
      return; // Exit the function if there's no token
    }
  
    const user = JSON.parse(userCookie);
    if (!user || !user.user_id) {
      setError("Invalid user data");
      return; // Exit the function if the user object or user_id is missing
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
    
      const leave = {
        req_datetime: new Date().toISOString(),
        req_type: leaveType.toLowerCase(),
        date_from: startDate.toISOString().split("T")[0],
        date_to: endDate.toISOString().split("T")[0],
        time_from: "00:00:00",
        time_to: "00:00:00",
        user_id: user.user_id,
        reason,
        attachment: attachment ? attachment.name : "",
      };
    
      try {
        const response = await axios.post("http://165.227.148.16:5000/requests", leave, {
          headers: {
            Authorization: `Bearer ${token}` // Including the token in the Authorization header
          }
        });
        console.log("Leave submitted:", response);
    
        setStartDate(new Date());
        setEndDate(new Date());
        setLeaveType("");
        setReason("");
        setAttachment(null);
  
        // Set success notification
        setNotification({
          open: true,
          message: "Leave submitted successfully!",
        });
      } catch (error) {
        console.error("Error submitting leave:", error.response.data);
        setError(error.response.data);
        setSuccess(false);
      }
    };
    const handleCloseNotification = () => {
      setNotification({ ...notification, open: false });
    };
    return (
      <Container component={Paper} style={{ padding: 20 }}>
        <Typography variant="h4" gutterBottom>New Leave</Typography>
        {success && <p>Leave submitted successfully.</p>}
        {error && <p>Error submitting leave: {error}</p>}
        <form onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormControl fullWidth style={{ marginBottom: 15 }}>
              <DatePicker label="Start Date" selected={startDate} onChange={setStartDate} dateFormat="yyyy-MM-dd" required />
            </FormControl>
            <FormControl fullWidth style={{ marginBottom: 15 }}>
              <DatePicker label="End Date" selected={endDate} onChange={setEndDate} dateFormat="yyyy-MM-dd" required />
            </FormControl>
          </LocalizationProvider>
          <FormControl fullWidth variant="outlined" style={{ marginBottom: 15 }}>
            <InputLabel htmlFor="leaveType">Leave Type</InputLabel>
            <Select
              label="Leave Type"
              id="leaveType"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              required
            >
      <MenuItem value=""><em>Select Leave Type</em></MenuItem>
      <MenuItem value="Annual Leave">Annual Leave</MenuItem>
      <MenuItem value="Sick Leave">Sick Leave</MenuItem>
      <MenuItem value="Emergency Leave">Emergency Leave</MenuItem>
      <MenuItem value="Maternity Leave">Maternity Leave</MenuItem>
      <MenuItem value="Other Leave">Other Leave</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            fullWidth
            required
            multiline
            rows={4}
            style={{ marginBottom: 15 }}
          />

          <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>
            Submit
          </Button>
        </form>
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
        >
          <Alert onClose={handleCloseNotification} severity="success" sx={{ width: "100%" }}>
            {notification.message}
          </Alert>
        </Snackbar>
      </Container>
    );
  }

  export default NewLeave