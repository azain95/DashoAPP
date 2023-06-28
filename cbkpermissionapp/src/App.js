// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
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
          <NavLink to="/history" activeClassName="active">
            History
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
    // Handle submission logic here
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
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MMMM d, yyyy"
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
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="MMMM d, yyyy"
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

function History() {
  return (
    <div className="content">
      <h2>History</h2>
      {/* Your history content here */}
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleSignIn = (credentials) => {
    // Handle sign in logic here
    console.log('Sign In:', credentials);
  };

  const handleSignUp = (credentials) => {
    // Handle sign up logic here
    console.log('Sign Up:', credentials);
  };

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark' : ''}`}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/signin" element={<SignIn handleSignIn={handleSignIn} />} />
          <Route path="/signup" element={<SignUp handleSignUp={handleSignUp} />} />
          <Route path="/newpermission" element={<NewPermission />} />
          <Route path="/history" element={<History />} />
          <Route path="/" element={<NewPermission />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
