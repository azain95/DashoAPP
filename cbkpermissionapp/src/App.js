// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import DatePicker from 'rsuite/DatePicker';
import 'react-date-picker/dist/DatePicker.css';
import { TimePicker } from 'react-ios-time-picker';
import 'react-time-picker/dist/TimePicker.css';

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

function SignIn({ handleSignIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      username,
      password,
    };
    handleSignIn(credentials);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="credentials">
      <h2 className="form-title">Sign In</h2>
      <form onSubmit={handleSubmit}>
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      username,
      password,
    };
    handleSignUp(credentials);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="credentials">
      <h2 className="form-title">Sign Up</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Sign Up</button>
      </form>
      <p>
        <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
}

function NewPermission() {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState('00:00');
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState('00:00');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const permission = {
      startDate,
      startTime,
      endDate,
      endTime,
      reason,
    };
    // Perform submission logic here (e.g., API call, data storage)
    console.log('New Permission:', permission);
    setStartDate(new Date());
    setStartTime('00:00');
    setEndDate(new Date());
    setEndTime('00:00');
    setReason('');
  };

  return (
    <div className="content">
      <h2>New Permission</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <br />
          <DatePicker
            value={startDate}
            onChange={setStartDate}
            format="yyyy-MM-dd"
            calendarIcon={null}
            clearIcon={null}
            required
          />
        </div>
        <div>
          <label htmlFor="startTime">Start Time:</label>
          <br />
          <TimePicker value={startTime} onChange={setStartTime} disableClock />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <br />
          <DatePicker
          
            value={endDate}
            onChange={setEndDate}
            format="yyyy-MM-dd"
            calendarIcon={null}
            clearIcon={null}
            required
          />
        </div>
        <div>
          <label htmlFor="endTime">End Time:</label>
          <br />
          <TimePicker value={endTime} onChange={setEndTime} disableClock />
        </div>
        <div>
          <label htmlFor="reason">Reason:</label>
          <br />
          <input
            type="text"
            id="reason"
            name="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function PermissionHistory() {
  const [permissions, setPermissions] = useState([]);

  // Simulating data fetching with useEffect
  useEffect(() => {
    // Perform API call or data retrieval here
    // Update `permissions` state with the fetched data
    const fetchedPermissions = []; // Replace with actual data fetching logic
    setPermissions(fetchedPermissions);
  }, []);

  return (
    <div className="content">
      <h2>Permission History</h2>
      {permissions.length > 0 ? (
        <ul>
          {permissions.map((permission) => (
            <li key={permission.id}>
              <p>Start Date: {permission.startDate}</p>
              <p>Start Time: {permission.startTime}</p>
              <p>End Date: {permission.endDate}</p>
              <p>End Time: {permission.endTime}</p>
              <p>Reason: {permission.reason}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No permissions found.</p>
      )}
    </div>
  );
}

function NewLeave() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState('');
  const [attachment, setAttachment] = useState(null);

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const leave = {
      startDate,
      endDate,
      leaveType,
      reason,
      attachment,
    };
    // Perform submission logic here (e.g., API call, data storage)
    console.log('New Leave:', leave);
    setStartDate(new Date());
    setEndDate(new Date());
    setLeaveType('');
    setReason('');
    setAttachment(null);
  };

  return (
    <div className="content">
      <h2>New Leave</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <br />
          <DatePicker
          appearance="default" placeholder="Default" style={{ width: 200 }}
            value={startDate}
            onChange={setStartDate}
            format="yyyy-MM-dd"
            calendarIcon={null}
            clearIcon={null}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <br />
          <DatePicker
          appearance="default" placeholder="Default" style={{ width: 200 }}
            value={endDate}
            onChange={setEndDate}
            format="yyyy-MM-dd"
            calendarIcon={null}
            clearIcon={null}
            required
          />
        </div>
        <div>
          <label htmlFor="leaveType">Leave Type:</label>
          <br />
          <select id="leaveType" name="leaveType" value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Annual Leave">Annual Leave</option>
            <option value="Unpaid Leave">Unpaid Leave</option>
          </select>
        </div>
        <div>
          <label htmlFor="reason">Reason:</label>
          <br />
          <input
            type="text"
            id="reason"
            name="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="attachment">Attachment:</label>
          <br />
          <input type="file" id="attachment" name="attachment" onChange={handleAttachmentChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function LeaveHistory() {
  const [leaves, setLeaves] = useState([]);

  // Simulating data fetching with useEffect
  useEffect(() => {
    // Perform API call or data retrieval here
    // Update `leaves` state with the fetched data
    const fetchedLeaves = []; // Replace with actual data fetching logic
    setLeaves(fetchedLeaves);
  }, []);

  return (
    <div className="content">
      <h2>Leave History</h2>
      {leaves.length > 0 ? (
        <ul>
          {leaves.map((leave) => (
            <li key={leave.id}>
              <p>Start Date: {leave.startDate}</p>
              <p>End Date: {leave.endDate}</p>
              <p>Leave Type: {leave.leaveType}</p>
              <p>Reason: {leave.reason}</p>
              <p>Attachment: {leave.attachment}</p>
            </li>
          ))}
        </ul>
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
