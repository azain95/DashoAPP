// App.js
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Grid,
  useTheme,
} from '@mui/material';
import {
  PageContainer,
  ContentCard,
  ResponsiveGrid,
} from './styled/Layout';
import { LogoContainer } from './styled/Logo';
import { PrimaryButton } from './styled/Forms';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HistoryIcon from '@mui/icons-material/History';
import { styled } from '@mui/material/styles';
import logo from '../logo.png';
import useAuthGuard from '../hooks/useAuthGuard'; 


const ActionCard = styled(ContentCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'light'
      ? '0 8px 16px rgba(0, 0, 0, 0.1)'
      : '0 8px 16px rgba(255, 255, 255, 0.1)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '64px',
  height: '64px',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.mode === 'light'
    ? 'rgba(0, 122, 255, 0.1)'
    : 'rgba(10, 132, 255, 0.1)',
  '& svg': {
    fontSize: '32px',
    color: theme.palette.primary.main,
  },
}));

const WelcomeCard = styled(ContentCard)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  background: theme.palette.mode === 'light'
    ? 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)'
    : 'linear-gradient(135deg, #0A84FF 0%, #5E5CE6 100%)',
  color: '#FFFFFF',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    textAlign: 'center',
    gap: theme.spacing(2),
  },
}));

const WelcomeContent = styled(Box)(({ theme }) => ({
  flex: 1,
}));

function Home() {
  useAuthGuard();
  const navigate = useNavigate();
  const theme = useTheme();

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

  const actions = [
    {
      title: 'New Permission',
      description: 'Request a new permission for time off',
      icon: <AddCircleOutlineIcon />,
      path: '/newpermission',
    },
    {
      title: 'Permission History',
      description: 'View your permission request history',
      icon: <HistoryIcon />,
      path: '/permissionhistory',
    },
    {
      title: 'New Leave',
      description: 'Submit a new leave request',
      icon: <AddCircleOutlineIcon />,
      path: '/newleave',
    },
    {
      title: 'Leave History',
      description: 'View your leave request history',
      icon: <HistoryIcon />,
      path: '/leavehistory',
    },
  ];

  return (
    <PageContainer>
      <WelcomeCard>
        <LogoContainer size="large">
          <img src={logo} alt="Logo" />
        </LogoContainer>
        <WelcomeContent>
          <Typography variant="h3" gutterBottom>
            Welcome, {user?.name || 'User'}
          </Typography>
          <Typography variant="h6">
            Manage your leaves and permissions efficiently
          </Typography>
          {quote && (
            <Typography variant="body1" sx={{ mt: 2, opacity: 0.9 }}>
              "{quote}"
            </Typography>
          )}
        </WelcomeContent>
      </WelcomeCard>

      <ResponsiveGrid>
        {actions.map((action) => (
          <ActionCard
            key={action.title}
            onClick={() => navigate(action.path)}
          >
            <IconWrapper>
              {action.icon}
            </IconWrapper>
            <Typography variant="h5" gutterBottom>
              {action.title}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
            >
              {action.description}
            </Typography>
          </ActionCard>
        ))}
      </ResponsiveGrid>
    </PageContainer>
  );
}

export default Home