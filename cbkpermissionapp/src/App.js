// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink,Navigate  } from 'react-router-dom';
import DatePicker from 'react-datepicker';

import Box from '@mui/material/Box';

import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';


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
import { useNavigate } from 'react-router-dom';
import { TextareaAutosize } from '@mui/material';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/signin', { user_id: username, password });

      // Handle successful sign-in
      if (response.status === 200 && response.data) {
        setUsername('');
        setPassword('');
        alert(`Welcome ${response.data.name}!`);

          // Store user data in localStorage
          localStorage.setItem('user', JSON.stringify(response.data));
          console.log('Stored user:', JSON.parse(localStorage.getItem('user')));
          console.log('Response data:', response.data);
        // Redirect to the desired route after successful sign-in
        navigate("/newpermission");
      }
    } catch (error) {
      // Handle sign-in error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert(error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        alert('No response from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        alert('Error in setting up the request');
      }
    }
  };

  return (
    <div className="credentials">
      <h2 className="form-title">Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <p>
        <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}



function SignUp({ handleSignUp }) {
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
        // Reset form fields on successful sign-up
        setUserId('');
        setName('');
        setEmail('');
        setMobile('');
        setPassword('');
        setError('');
        // Redirect to the Sign In route after successful sign-up
        return <Navigate to="/signin" />;
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
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    const permission = {
      req_datetime: new Date().toISOString(),
      req_type: 'permission',
      date_from: startDate.toISOString(),
      date_to: endDate.toISOString(),
      time_from: startTime,
      time_to: endTime,
      user_id: user.user_id,
      reason: reason,
      status: 'pending',
    };

    try {
      const response = await axios.post('http://localhost:5000/requests', permission);
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
    <div className="content">
      <h2>New Permission</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <br/>
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            dateFormat="yyyy-MM-dd"
            calendarIcon={null}
            clearIcon={null}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="startTime">Start Time:</label>
          <TimePicker value={startTime} onChange={setStartTime} required />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <br/>
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            dateFormat="yyyy-MM-dd"
            calendarIcon={null}
            clearIcon={null}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endTime">End Time:</label>
          <TimePicker value={endTime} onChange={setEndTime} required />
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <br/>
          <textarea
            id="reason"
            name="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            style={{width: '100%', height: '60px', padding: '10px'}}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}




function PermissionHistory() {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchPermissionHistory = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await axios.get(`http://localhost:5000/requests/user/${user.user_id}`);

        if (response.data && response.data.length > 0) {
          // Filter to only include permissions
          const permissionsData = response.data.filter(req => req.req_type.toLowerCase() === 'permission');
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

  return (
    <div className="content">
      <h2>Permission History</h2>
      <br/>
      <br/>
      {permissions.length > 0 ? (
        <Box className="leave-container">
          {permissions.map((permission) => (
            <div className="leave-card" key={permission.id}>
              <div className="leave-card-header">
                <p >{permission.req_type}</p >
              </div>
              <Box>
                <p size="small">{getStatusLabel(permission.status)}</p>
                <p>Start Date: {permission.date_from.split('T')[0]}</p>
                <p>Start Time: {permission.time_from}</p>
                <p>End Date: {permission.date_to.split('T')[0]}</p>
                <p>End Time: {permission.time_to}</p>
                <p>Reason: {permission.reason}</p>
                <p>Attachment: {permission.attachment}</p>
              </Box>
              <br/>
            </div>
          ))}
        </Box>
      ) : (
        <p>No permissions found.</p>
      )}
    </div>
  );
}


function NewLeave() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

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
      const response = await axios.post("http://localhost:5000/requests", leave);
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
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await axios.get(`http://localhost:5000/requests/user/${user.user_id}`);
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



function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  const handleSignIn = (credentials) => {
    // Perform sign-in logic here (e.g., API call, authentication)
    console.log('Sign In:', credentials);
    setUser(credentials);
  };

  const handleSignUp = (credentials) => {
    // Perform sign-up logic here (e.g., API call, user creation)
    console.log('Sign Up:', credentials);
    setUser(credentials);
  };

  const handleSignOut = () => {
    setUser(null);
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
            <Route
              path="/signin"
              element={<SignIn handleSignIn={handleSignIn} />}
              // Render SignIn component only when user is not authenticated
              // Replace `user === null` with actual authentication check
              // For example: `user === null ? <SignIn /> : <Navigate to="/newpermission" />`
              // <Navigate to="/newpermission" /> redirects to the NewPermission component
              // when the user is already signed in
              // <Navigate to="/" replace /> can be used to replace the current URL
              // with the specified URL in the browser history
              // You might want to adjust this behavior according to your application's needs
              // For example: <Navigate to="/newpermission" replace={user !== null} />
              // Redirects to NewPermission only if the user is authenticated
              // Otherwise, stays on the SignIn page
              caseSensitive
            />
            <Route
              path="/signup"
              element={<SignUp handleSignUp={handleSignUp} />}
              // Render SignUp component only when user is not authenticated
              // Replace `user === null` with actual authentication check
              caseSensitive
            />
            <Route path="/signin" element={<SignIn />} caseSensitive />
          <Route path="/signup" element={<SignUp />} caseSensitive />
            <Route path="/newpermission" element={<NewPermission />} caseSensitive />
            <Route path="/permissionhistory" element={<PermissionHistory />} caseSensitive />
            <Route path="/newleave" element={<NewLeave />} caseSensitive />
            <Route path="/leavehistory" element={<LeaveHistory />} caseSensitive />
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
