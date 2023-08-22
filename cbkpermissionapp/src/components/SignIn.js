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
          {/* <Typography variant="body2" style={{ textAlign: 'center', marginTop: 10 }}>
            Don't have an account? <MuiLink component={RouterLink} to="/signup" variant="body2">Sign Up</MuiLink>
          </Typography> */}
        </form>
      </Paper>
    </Container>
  );
}


export default SignIn;
