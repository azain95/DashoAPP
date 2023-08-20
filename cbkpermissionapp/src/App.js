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


// import { TimePicker } from 'react-ios-time-picker';



import logo from './logocbk.png';
import './App.css';



function Navbar({ darkMode, toggleDarkMode , handleSignOut }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const NavList = () => (
    <List>
         <ListItem button component={NavLink} to="/" activeClassName="active">
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={NavLink} to="/newpermission" activeClassName="active">
        <ListItemText primary="New Permission" />
      </ListItem>
      <ListItem button component={NavLink} to="/permissionhistory" activeClassName="active">
        <ListItemText primary="Permissions History" />
      </ListItem>
      <ListItem button component={NavLink} to="/newleave" activeClassName="active">
        <ListItemText primary="New Leave" />
      </ListItem>
      <ListItem button component={NavLink} to="/leavehistory" activeClassName="active">
        <ListItemText primary="Leave History" />
      </ListItem>
      <ListItem button onClick={handleSignOut} component={NavLink} to="/signin" activeClassName="active">
        <ListItemText primary="Logout" />
      </ListItem>
      <ListItem button onClick={toggleDarkMode}>
        <ListItemText primary={darkMode ? 'Light Mode' : 'Dark Mode'} />
      </ListItem>
      
    </List>
  );

  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="navbar">
        {isMobile ? (
          <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Leave and Permission Management
            </Typography>
            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
              <NavList />
            </Drawer>
          </>
        ) : (
          <>
  
            <Button color="inherit" component={NavLink} to="/" activeClassName="active">Home</Button>
            <Button color="inherit" component={NavLink} to="/newpermission" activeClassName="active">New Permission</Button>
  
         <Button color="inherit" component={NavLink} to="/permissionhistory" activeClassName="active">Permissions History</Button>
         <Button color="inherit" component={NavLink} to="/newleave" activeClassName="active">New Leave</Button>
         <Button color="inherit" component={NavLink} to="/leavehistory" activeClassName="active">Leave History</Button>
         <Button color="inherit" onClick={handleSignOut} component={NavLink} to="/signin" activeClassName="active">Logout  </Button>
         
            <Button color="inherit" onClick={toggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}


function SignIn(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await props.handleSignIn(username, password); // Call the handleSignIn method passed as props
      navigate('/'); // Redirect to the home page
    } catch (error) {
      // Handle sign-in error
      alert(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">
          Sign In
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 15 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 15 }}
          >
            Sign In
          </Button>
          <Typography variant="body2" style={{ textAlign: 'center', marginTop: 10 }}>
            Don't have an account? <MuiLink component={RouterLink} to="/signup" variant="body2">Sign Up</MuiLink>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
}




function SignUp() {
  const navigate = useNavigate();
  const [user_id, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and mobile number
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }

    if (!validateMobile(mobile)) {
      setError('Invalid mobile number');
      return;
    }

    // Perform sign-up logic
    try {
      const credentials = {
        user_id,
        name,
        email,
        mobile,
        password,
      };

      const response = await axios.post('http://localhost:5000/signup', credentials);

      if (response.status === 200) {
        navigate('/signin');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError('Error signing up');
      }
    }
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Mobile number validation function
  const validateMobile = (mobile) => {
    const mobileRegex = /^\d{8}$/;
    return mobileRegex.test(mobile);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">
          Sign Up
        </Typography>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 15 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="User ID"
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 15 }}
          >
            Sign Up
          </Button>
          <Typography variant="body2" style={{ textAlign: 'center', marginTop: 10 }}>
            Already have an account? <MuiLink component={RouterLink} to="/signin" variant="body2">Sign In</MuiLink>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
}





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
      date_from: startDate.toISOString(),
      date_to: endDate.toISOString(),
      time_from: formattedStartTime,
      time_to: formattedEndTime,
      user_id: user.user_id, // Now safe to access, as we've checked that user is defined
      reason: reason,
      status: 'pending',
    };
  
    // Retrieve the token from cookies
    const token = Cookies.get('token');
  
    try {
      const response = await axios.post('http://localhost:5000/requests', permission, {
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

        const response = await axios.get(`http://localhost:5000/requests/user/${user.user_id}`, {
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
              <TableCell>Attachment</TableCell>
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
                  <TableCell>{permission.attachment}</TableCell>
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
      const response = await axios.post("http://localhost:5000/requests", leave, {
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
        <Button variant="contained" component="label" color="primary">
          Upload Attachment
          <input type="file" hidden onChange={(e) => setAttachment(e.target.files[0])} />
        </Button>
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

function LeaveHistory() {
  const [leaves, setLeaves] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    startDate: "",
    endDate: "",
    reason: "",
    attachment: "",
  });

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("T")[0].split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSearchChange = (e, field) => {
    setFilters({ ...filters, [field]: e.target.value });
  };

  const filteredLeaves = leaves.filter((leave) => {
    if (
      filters.type &&
      !leave.req_type.toLowerCase().includes(filters.type.toLowerCase())
    )
      return false;
    if (
      filters.status &&
      leave.status.toLowerCase() !== filters.status.toLowerCase()
    )
      return false;
    if (
      filters.startDate &&
      formatDate(leave.date_from) !== filters.startDate
    )
      return false;
    if (
      filters.endDate &&
      formatDate(leave.date_to) !== filters.endDate
    )
      return false;
    if (
      filters.reason &&
      !leave.reason.toLowerCase().includes(filters.reason.toLowerCase())
    )
      return false;
    if (
      filters.attachment &&
      !leave.attachment.toLowerCase().includes(filters.attachment.toLowerCase())
    )
      return false;
    return true;
  });

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      const userCookie = Cookies.get('user');
      const token = Cookies.get('token'); // Retrieve the token from cookies

      if (!userCookie || !token) {
        console.error('User not authenticated');
        setLeaves([]);
        return; // Exit if there's no user cookie or token
      }
  
      const user = JSON.parse(userCookie);
      if (!user || !user.user_id) {
        console.error('Invalid user data');
        setLeaves([]);
        return; // Exit if the user object or user_id is missing
      }

      try {
        const response = await axios.get(`http://localhost:5000/requests/user/${user.user_id}`, {
          headers: {
            Authorization: `Bearer ${token}` // Including the token in the Authorization header
          }
        });

        if (response.data && response.data.length > 0) {
          // Exclude leaves of type "permission" and "swap"
          const filteredLeaves = response.data.filter(
            (leave) => leave.req_type.toLowerCase() !== "permission" && leave.req_type.toLowerCase() !== "swap"
          );


            // Sort by request date in descending order (newest to oldest)
            filteredLeaves.sort((a, b) => new Date(b.req_datetime) - new Date(a.req_datetime));

          
          setLeaves(filteredLeaves);
        } else {
          setLeaves([]);
        }
      } catch (error) {
        console.error('Error retrieving leave history:', error.message);
        setLeaves([]);
      }
    };
  
    fetchLeaveHistory();
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
  return (
    <div className="content">
      <Typography variant="h4" gutterBottom>
        Leave History
      </Typography>
      <div className="filter-container">
        <TextField
          label="Type"
          variant="outlined"
          size="small"
          onChange={(e) => handleSearchChange(e, "type")}
        />
        <TextField
          label="Status"
          variant="outlined"
          size="small"
          onChange={(e) => handleSearchChange(e, "status")}
        />
        <TextField
          label="Start Date (DD/MM/YYYY)"
          variant="outlined"
          size="small"
          onChange={(e) => handleSearchChange(e, "startDate")}
        />
        <TextField
          label="End Date (DD/MM/YYYY)"
          variant="outlined"
          size="small"
          onChange={(e) => handleSearchChange(e, "endDate")}
        />
        <TextField
          label="Reason"
          variant="outlined"
          size="small"
          onChange={(e) => handleSearchChange(e, "reason")}
        />
        <TextField
          label="Attachment"
          variant="outlined"
          size="small"
          onChange={(e) => handleSearchChange(e, "attachment")}
        />
      </div>
      <Paper style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Attachment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeaves.length > 0 ? (
              filteredLeaves.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>{leave.req_type}</TableCell>
                  <TableCell>{getStatusLabel(leave.status)}</TableCell>
                  <TableCell>{formatDate(leave.date_from)}</TableCell>
                  <TableCell>{formatDate(leave.date_to)}</TableCell>
                  <TableCell>{leave.reason}</TableCell>
                  <TableCell>{leave.attachment}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" align="center">
                  No leaves found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}


function Home() {
  // Retrieve user data from the cookie
  const userCookie = Cookies.get('user');
  const user = userCookie ? JSON.parse(userCookie) : null;

  // Fetch the daily quote
  const [quote, setQuote] = useState('');
  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => setQuote(data.content));
  }, []);

    // State to hold weather data
    const [weather, setWeather] = useState(null);

    // Fetch weather data on component mount
    useEffect(() => {
      const city = 'Kuwait'; // You can change this to your desired city
      const apiKey = '241391722acb2320b0a15bb143ab7d90'; // Replace with your actual API key
  
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
          const weatherInfo = {
            temperature: Math.round(data.main.temp),
            description: data.weather[0].description,
          };
          setWeather(weatherInfo);
        })
        .catch(error => console.error('Error fetching weather:', error));
    }, []);

  return (
    <div className="content home-content">
      <h2>Welcome, {user ? user.name : 'Guest'}!</h2>
      <h3 className="welcome-message">We're glad to have you here. Feel free to explore and manage your requests.</h3>
      <div className="user-profile-card">
        {user && (
          <>
            <img src="profile-image-placeholder.png" alt="Profile " />
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Mobile: {user.mobile}</p>
          </>
        )}
      </div>
      <div className="daily-quote">
        <blockquote>{quote}</blockquote>
      </div>
      {/* <div className="weather-widget">
        {weather ? (
          <p>Your local weather: {weather.temperature}°C, {weather.description}</p>
        ) : (
          <p>Loading weather...</p>
        )}
      </div> */}
      <div id="openweathermap-widget-24"></div>
    </div>
  );
}





function App() {
  const [darkMode, setDarkMode] = useState(true);
  const userCookie = Cookies.get('user');
  const [user, setUser] = useState(userCookie ? JSON.parse(userCookie) : null);


// Toggle dark mode function
const toggleDarkMode = () => {
  setDarkMode(!darkMode);
};


const handleSignIn = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:5000/signin', { user_id: username, password });
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
      const response = await axios.post('http://localhost:5000/signup', credentials);
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
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#4caf50', // Your green color
      },
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 variant="h6" style={{ flexGrow: 1 }}>
              Leave and Permission Management
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

                <Route path="/signup" element={<SignUp handleSignUp={handleSignUp} />} />
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
