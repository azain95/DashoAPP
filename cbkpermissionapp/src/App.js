// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink,Navigate , Switch } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import { Button, Container } from '@mui/material';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel, TextField, Typography } from '@material-ui/core';


import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';
import { TextareaAutosize } from '@mui/material';
import { useNavigate } from 'react-router-dom';


import { TimePicker } from 'react-ios-time-picker';



import logo from './logocbk.png';
import './App.css';

function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      <ul className="nav-menu">
        <li>
          <NavLink to="/newpermission" activeClassName="active">
            New Permission
          </NavLink>
        </li>
        <li>
          <NavLink to="/permissionhistory" activeClassName="active">
            Permission History
          </NavLink>
        </li>
        <li>
          <NavLink to="/newleave" activeClassName="active">
            New Leave
          </NavLink>
        </li>
        <li>
          <NavLink to="/leavehistory" activeClassName="active">
            Leave History
          </NavLink>
        </li>
        <li>
          <Link to="/signin">Logout</Link>
        </li>
      </ul>
      <button className="dark-mode-button" onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
}

function SignIn({ handleSignIn: parentHandleSignIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/signin', { user_id: username, password });
      if (response.data.token) {
        Cookies.set('token', response.data.token);
        console.log('Response:', response);
        setUsername('');
        setPassword('');
        alert(`Welcome ${response.data.user.name}!`);
        Cookies.set('user', JSON.stringify(response.data.user));
        console.log('Stored user:', JSON.parse(Cookies.get('user')));
        console.log('Redirecting to /newpermission');
        navigate('/');
      }
    } catch (error) {
      // Handle sign-in error
      if (error.response) {
        alert(error.response.data.error);
      } else if (error.request) {
        alert('No response from server');
      } else {
        alert('Error in setting up the request');
      }
    }
  };

  return (
    <Container component={Paper} className="credentials">
      <h2 className="form-title">Sign In</h2>
      <form onSubmit={handleSignIn}>
        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth />
        <TextField type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
        <Button type="submit" variant="contained" color="primary">Sign In</Button>
      </form>
      <p>
        <Link to="/signup">Sign Up</Link>
      </p>
    </Container>
  );
}




function SignUp({ handleSignUp }) {
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
        user_id, // sending the user_id to the server
        name,
        email,
        mobile,
        password,
      };

      const response = await axios.post('http://localhost:5000/signup', credentials);

      // Handle successful sign-up
      if (response.status === 200) {
        // // Reset form fields on successful sign-up
        // setUserId('');
        // setName('');
        // setEmail('');
        // setMobile('');
        // setPassword('');
        // setError('');
        // Redirect to the Sign In route after successful sign-up
        navigate("/signin");

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
    <div className="credentials">
      <h2 className="form-title">Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="user_id">User ID:</label>
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
}


function CustomInput({ value, onClick }) {
  return (
    <button className="custom-input" onClick={onClick}>
      {value}
    </button>
  )
}



function NewPermission() {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState('12:00');
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState('12:00');
  const [reason, setReason] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = Cookies.get('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(Cookies.get('user'));
  
    // Check that the user object exists before attempting to access its properties
    if (!user) {
      console.error('User object is undefined');
      return;
    }
  
    // Log the user object to the console
    console.log('User object:', user);
  
    const permission = {
      req_datetime: new Date().toISOString(),
      req_type: 'permission',
      date_from: startDate.toISOString(),
      date_to: endDate.toISOString(),
      time_from: startTime,
      time_to: endTime,
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
      console.log(response.data);
      setStartDate(new Date());
      setStartTime('12:00');
      setEndDate(new Date());
      setEndTime('12:00');
      setReason('');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container component={Paper} className="content">
      <h2>New Permission</h2>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel htmlFor="startDate">Start Date:</InputLabel>
          <DatePicker selected={startDate} onChange={setStartDate} dateFormat="yyyy-MM-dd" required />
        </FormControl>
        <TextField label="Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} fullWidth required />
        <FormControl fullWidth>
          <InputLabel htmlFor="endDate">End Date:</InputLabel>
          <DatePicker selected={endDate} onChange={setEndDate} dateFormat="yyyy-MM-dd" required />
        </FormControl>
        <TextField label="End Time" value={endTime} onChange={(e) => setEndTime(e.target.value)} fullWidth required />
        <TextField label="Reason" value={reason} onChange={(e) => setReason(e.target.value)} fullWidth required multiline rows={4} />
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </Container>
  );
}





function PermissionHistory() {
  const [permissions, setPermissions] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
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
          const permissionsData = response.data.filter(req => req.req_type.toLowerCase() === 'permission');
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
  const handleFilterChange = (field, value) => {
    setFilters({
      ...filters,
      [field]: value
    });
  };

  const filteredPermissions = permissions.filter((permission) => {
    if (statusFilter && permission.status !== statusFilter) return false;
    if (dateFilter && !permission.req_datetime.startsWith(dateFilter)) return false;
    return true;
  });

  return (
    <div className="content">
      <Typography variant="h4" gutterBottom>Permission History</Typography>
      <div className="filter-container">
        <FormControl variant="outlined" style={{ marginRight: '20px' }}>
          <InputLabel>Status</InputLabel>
          <Select label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            
          >
            <MenuItem value=""><em>All</em></MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Date"
          type="date"
          variant="outlined"
          onChange={(e) => setDateFilter(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <Paper style={{ marginTop: '20px' }}>
        <Table>
        <TableHead>
            <TableRow>
              <TableCell><TextField label="Type" variant="outlined" size="small" onChange={(e) => handleFilterChange('type', e.target.value)} /></TableCell>
              <TableCell>
                <FormControl variant="outlined" size="small">
                  <Select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="approved">Approved</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell><DatePicker label="Start Date" inputVariant="outlined" size="small" value={filters.startDate} onChange={(date) => handleFilterChange('startDate', date)} /></TableCell>
              <TableCell><TextField label="Start Time" variant="outlined" size="small" onChange={(e) => handleFilterChange('startTime', e.target.value)} /></TableCell>
              <TableCell><DatePicker label="End Date" inputVariant="outlined" size="small" value={filters.endDate} onChange={(date) => handleFilterChange('endDate', date)} /></TableCell>
              <TableCell><TextField label="End Time" variant="outlined" size="small" onChange={(e) => handleFilterChange('endTime', e.target.value)} /></TableCell>
              <TableCell><TextField label="Reason" variant="outlined" size="small" onChange={(e) => handleFilterChange('reason', e.target.value)} /></TableCell>
              <TableCell><TextField label="Attachment" variant="outlined" size="small" onChange={(e) => handleFilterChange('attachment', e.target.value)} /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPermissions.length > 0 ? (
              filteredPermissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell>{permission.req_type}</TableCell>
                  <TableCell>{getStatusLabel(permission.status)}</TableCell>
                  <TableCell>{permission.date_from.split('T')[0]}</TableCell>
                  <TableCell>{permission.time_from}</TableCell>
                  <TableCell>{permission.date_to.split('T')[0]}</TableCell>
                  <TableCell>{permission.time_to}</TableCell>
                  <TableCell>{permission.reason}</TableCell>
                  <TableCell>{permission.attachment}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="8">No permissions found.</TableCell>
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
      setSuccess(true);
      setError(null);
  
      navigate("/leavehistory");
    } catch (error) {
      console.error("Error submitting leave:", error.response.data);
      setError(error.response.data);
      setSuccess(false);
    }
  };
  
  return (
    <div className="content">
      <h2>New Leave</h2>
      {success && <p>Leave submitted successfully.</p>}
      {error && <p>Error submitting leave: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <br />
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            dateFormat="yyyy-MM-dd"
            calendarIcon={null}
            clearIcon={null}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <br />
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            dateFormat="yyyy-MM-dd"
            calendarIcon={null}
            clearIcon={null}
            required
          />
        </div>
        <div>
          <label htmlFor="leaveType">Leave Type:</label>
          <br />
          <select
            id="leaveType"
            name="leaveType"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
          >
            <option value="">Select Leave Type</option>
            <option value="Annual Leave">Annual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Other Leave">Other Leave</option>
          </select>
        </div>
        <div>
          <label htmlFor="reason">Reason:</label>
          <br />
          <textarea
            type="text"
            id="reason"
            name="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            style={{width: '100%', height: '60px', padding: '10px'}}
            required
          />
        </div>
        <div>
          <label htmlFor="attachment">Attachment:</label>
          <br />
          <input
            type="file"
            id="attachment"
            name="attachment"
            onChange={(e) => setAttachment(e.target.files[0])}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}



function LeaveHistory() {
  const [leaves, setLeaves] = useState([]);

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
          // Exclude leaves of type "Permission"
          const filteredLeaves = response.data.filter(leave => leave.req_type.toLowerCase() !== "permission");
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
      <h2>Leave History</h2>
      <br/>
      <br/>
      {leaves.length > 0 ? (
        <Box className="leave-container">
          {leaves.map((leave) => (
            <div className="leave-card" key={leave.id}>
              
              
              <div className="leave-card-header">
                <p >{leave.req_type}</p >
              </div>
              <Box>
                <p size="small">{getStatusLabel(leave.status)}</p>
                <p>Start Date: {leave.date_from.split('T')[0]}</p>
                <p>End Date: {leave.date_to.split('T')[0]}</p>
                <p>Reason: {leave.reason}</p>
                <p>Attachment: {leave.attachment}</p>
                </Box>
              <br/>
            </div>
          ))}
        </Box>
      ) : (
        <p>No leaves found.</p>
      )}
    </div>
  );
}


function Home() {
  // Retrieve user data from the cookie
  const userCookie = Cookies.get('user');
  const user = userCookie ? JSON.parse(userCookie) : null;

  return (
    <div className="content">
      <h2>Welcome, {user ? user.name : 'Guest'}!</h2>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Mobile: {user.mobile}</p>
        </div>
      )}
      {/* You can display some welcome message or other content here */}
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);


  const handleSignIn = async (username, password) => { // Updated parameters
    try {
      const response = await axios.post('http://localhost:5000/signin', { user_id: username, password });
      if (response.data.token) {
        Cookies.set('token', response.data.token);
        Cookies.set('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        navigate('/'); // Redirect to home page
      }
    } catch (error) {
      // Handle sign-in error
      console.error('Error signing in:', error);
    }
  };

  const handleSignUp = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/signup', credentials);
      if (response.data.token) {
        Cookies.set('token', response.data.token);
        Cookies.set('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        navigate('/'); // Redirect to home page
      }
    } catch (error) {
      // Handle sign-up error
      console.error('Error signing up:', error);
    }
  };
  

  const handleSignOut = () => {
    // Remove user data and token from cookies
    Cookies.remove('user');
    Cookies.remove('token');
    setUser(null);
    navigate('/'); // Redirect to home page or login page
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Leave and Permission Management</h1>
        </header>
        <div className="container">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route path="/signin" element={<SignIn handleSignIn={handleSignIn} />} caseSensitive />
            <Route path="/signup" element={<SignUp handleSignUp={handleSignUp} />} caseSensitive />
            <Route path="/newpermission" element={<NewPermission />} caseSensitive />
            <Route path="/permissionhistory" element={<PermissionHistory />} caseSensitive />
            <Route path="/newleave" element={<NewLeave />} caseSensitive />
            <Route path="/leavehistory" element={<LeaveHistory />} caseSensitive />
            <Route path="/" element={<Home user={user} />} caseSensitive /> {/* Passing user prop */}
          </Routes>
        </div>
        <footer className="App-footer">
          {user && <p>Welcome, {user.username}!</p>}
          {user && <button onClick={handleSignOut}>Sign Out</button>}
        </footer>
      </div>
    </Router>
  );
}

export default App;
