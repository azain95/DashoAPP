
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


function PermissionHistory() {
    const [permissions, setPermissions] = useState([]);
    const [filters, setFilters] = useState({
      type: '',
      status: '',
      startDate: null,
      startTime: '',
      endDate: null,
      endTime: '',
      reason: '',
      attachment: ''
    });
    const theme = useTheme();
  
    useEffect(() => {
      const fetchPermissionHistory = async () => {
        try {
          const user = JSON.parse(Cookies.get('user'));
          if (!user) {
            console.error('User object is undefined');
            return;
          }
  
          const token = Cookies.get('token');
  
          const response = await axios.get(`https://api.dashoprojects.com/requests/user/${user.user_id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
  
          if (response.data && response.data.length > 0) {
            const permissionsData = response.data.filter(req => ['permission', 'swap'].includes(req.req_type.toLowerCase()));
            permissionsData.sort((a, b) => new Date(b.req_datetime) - new Date(a.req_datetime));
            setPermissions(permissionsData);
          } else {
            setPermissions([]);
          }
        } catch (error) {
          console.error('Error retrieving permission history:', error.message);
          setPermissions([]);
        }
      };
  
      fetchPermissionHistory();
    }, []);
  
    const getStatusLabel = (status) => {
      if (status === 'pending') {
        return <span className="status-pending">Pending</span>;
      } else if (status === 'rejected') {
        return <span className="status-rejected">Rejected</span>;
      } else {
        return <span className="status-approved">Approved</span>;
      }
    };
  
    const formatDate = (dateString) => {
      const [year, month, day] = dateString.split('T')[0].split('-');
      return `${day}/${month}/${year}`;
    };
  
    const handleSearchChange = (e, field) => {
      setFilters({ ...filters, [field]: e.target.value });
    };
  
    const filteredPermissions = permissions.filter((permission) => {
      if (filters.type && !permission.req_type.includes(filters.type)) return false;
      if (filters.status && permission.status !== filters.status) return false;
      if (filters.startDate && formatDate(permission.date_from) !== filters.startDate) return false;
      if (filters.startTime && !permission.time_from.includes(filters.startTime)) return false;
      if (filters.endDate && formatDate(permission.date_to) !== filters.endDate) return false;
      if (filters.endTime && !permission.time_to.includes(filters.endTime)) return false;
      if (filters.reason && !permission.reason.includes(filters.reason)) return false;
      if (filters.attachment && !permission.attachment.includes(filters.attachment)) return false;
      return true;
    });
  
    return (
      <div className="content">
        <Typography variant="h4" gutterBottom>Permission History</Typography>
        <div className="filter-container">
          <TextField label="Type" variant="outlined" size="small" onChange={(e) => handleSearchChange(e, 'type')} />
          <TextField label="Status" variant="outlined" size="small" onChange={(e) => handleSearchChange(e, 'status')} />
          <TextField label="Start Date (DD/MM/YYYY)" variant="outlined" size="small" onChange={(e) => handleSearchChange(e, 'startDate')} />
          <TextField label="Start Time" variant="outlined" size="small" onChange={(e) => handleSearchChange(e, 'startTime')} />
          <TextField label="End Date (DD/MM/YYYY)" variant="outlined" size="small" onChange={(e) => handleSearchChange(e, 'endDate')} />
          <TextField label="End Time" variant="outlined" size="small" onChange={(e) => handleSearchChange(e, 'endTime')} />
          <TextField label="Reason" variant="outlined" size="small" onChange={(e) => handleSearchChange(e, 'reason')} />
        </div>
        <Paper style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Reason</TableCell>
                {/* <TableCell>Attachment</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPermissions.length > 0 ? (
                filteredPermissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell>{permission.req_type}</TableCell>
                    <TableCell>{getStatusLabel(permission.status)}</TableCell>
                    <TableCell>{formatDate(permission.date_from)}</TableCell>
                    <TableCell>{permission.time_from}</TableCell>
                    <TableCell>{formatDate(permission.date_to)}</TableCell>
                    <TableCell>{permission.time_to}</TableCell>
                    <TableCell>{permission.reason}</TableCell>
                    {/* <TableCell>{permission.attachment}</TableCell> */}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                <TableCell colSpan="8" align="center">No permissions found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
  }
export default PermissionHistory  