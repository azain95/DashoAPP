// App.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Snackbar,
  Alert,
  Link,
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

const SignUpContainer = styled(Box)(({ theme }) => ({
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

const SignUpCard = styled(ContentCard)(({ theme }) => ({
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

function SignUp({ handleSignUp }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    user_id: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await handleSignUp({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        user_id: formData.user_id,
        password: formData.password,
      });
      navigate('/');
    } catch (error) {
      setError('Error creating account. Please try again.');
    }
  };

  const handleCloseError = () => {
    setError('');
  };

  return (
    <SignUpContainer>
      <SignUpCard>
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
          Create your account to get started
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormSection>
            <StyledTextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              autoFocus
            />
            <StyledTextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <StyledTextField
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              fullWidth
              required
            />
            <StyledTextField
              label="Username"
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              fullWidth
              required
            />
            <StyledTextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
            />
            <StyledTextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              required
            />
            <ActionBar>
              <PrimaryButton
                type="submit"
                variant="contained"
                size="large"
                fullWidth
              >
                Sign Up
              </PrimaryButton>
            </ActionBar>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/signin')}
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Already have an account? Sign In
              </Link>
            </Box>
          </FormSection>
        </form>
      </SignUpCard>

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
    </SignUpContainer>
  );
}

export default SignUp;