// App.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  PageContainer,
  ContentCard,
  FormSection,
  ActionBar,
} from './styled/Layout';
import { LogoContainer } from './styled/Logo';
import {
  StyledTextField,
  PrimaryButton,
} from './styled/Forms';
import logo from '../logo.png';
import { styled } from '@mui/material/styles';

const LoginContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  background: theme.palette.mode === 'light'
    ? 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)'
    : 'linear-gradient(135deg, rgba(10, 132, 255, 0.1) 0%, rgba(94, 92, 230, 0.1) 100%)',
}));

const LoginCard = styled(ContentCard)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

const LogoSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  '& .logo-container': {
    marginBottom: theme.spacing(3),
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '120px',
      height: '2px',
      background: `linear-gradient(90deg, 
        transparent 0%, 
        ${theme.palette.primary.main}40 50%, 
        transparent 100%
      )`,
      marginTop: theme.spacing(3),
    },
  },
}));

const CompanyName = styled(Typography)(({ theme }) => ({
  background: theme.palette.mode === 'light'
    ? 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)'
    : 'linear-gradient(135deg, #0A84FF 0%, #5E5CE6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
  fontWeight: 700,
  marginTop: theme.spacing(2),
}));

function SignIn({ handleSignIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSignIn(username, password);
      navigate('/');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  const handleCloseError = () => {
    setError('');
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LogoSection>
          <Box className="logo-container">
            <LogoContainer size="large">
              <img
                src={logo}
                alt="Logo"
              />
            </LogoContainer>
          </Box>
          <CompanyName variant="h4">
            DASHO
          </CompanyName>
        </LogoSection>
        
        <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Sign in to manage your leaves and permissions
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormSection>
            <StyledTextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
              autoFocus
              autoComplete="username"
            />
            <StyledTextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              autoComplete="current-password"
            />
            <ActionBar>
              <PrimaryButton
                type="submit"
                variant="contained"
                size="large"
                fullWidth
              >
                Sign In
              </PrimaryButton>
            </ActionBar>
          </FormSection>
        </form>
      </LoginCard>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </LoginContainer>
  );
}

export default SignIn;
