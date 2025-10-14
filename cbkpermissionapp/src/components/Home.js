// src/pages/Home.js  (أو المسار عندك)
import React, { useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Grid,
  Chip,
  useTheme,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { PageContainer, ContentCard, ResponsiveGrid } from './styled/Layout';
import { LogoContainer } from './styled/Logo';
// import { PrimaryButton } from '../styled/Forms'; // استخدمه إذا بدك زر إضافي
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HistoryIcon from '@mui/icons-material/History';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ChecklistIcon from '@mui/icons-material/Checklist';
import logo from '../logo.png';
import useAuthGuard from '../hooks/useAuthGuard';
import axios from '../utils/axiosInstance';

// ===== Styled =====
const ActionCard = styled(ContentCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  outline: 'none',
  '&:hover, &:focus-visible': {
    transform: 'translateY(-4px)',
    boxShadow:
      theme.palette.mode === 'light'
        ? '0 8px 16px rgba(0, 0, 0, 0.1)'
        : '0 8px 16px rgba(255, 255, 255, 0.1)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  backgroundColor:
    theme.palette.mode === 'light'
      ? 'rgba(0, 122, 255, 0.1)'
      : 'rgba(10, 132, 255, 0.12)',
  '& svg': {
    fontSize: 32,
    color: theme.palette.primary.main,
  },
}));

const WelcomeCard = styled(ContentCard)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  background:
    theme.palette.mode === 'light'
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
  animation: 'fadeIn 0.6s ease-in-out',
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(10px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
}));

const WelcomeContent = styled(Box)({ flex: 1 });

const StatCard = styled(ContentCard)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));

// ===== Component =====
export default function Home() {
  useAuthGuard();
  const navigate = useNavigate();
  const theme = useTheme();

  // user from cookie
  const userCookie = Cookies.get('user');
  const user = userCookie ? JSON.parse(userCookie) : null;

  // greeting
  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  // optional quote (disabled by default unless REACT_APP_QUOTE_URL set)
  const [quote, setQuote] = useState(null);
  useEffect(() => {
    const QUOTE_URL = process.env.REACT_APP_QUOTE_URL || '';
    if (!QUOTE_URL) return; // disabled
    let ignore = false;
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(QUOTE_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`Quote status ${res.status}`);
        const data = await res.json();
        if (!ignore) {
          // حاول نوحّد الحقول المتوقعة (content أو text)
          setQuote(data.content || data.text || null);
        }
      } catch {
        if (!ignore) setQuote(null);
      }
    })();
    return () => {
      ignore = true;
      controller.abort();
    };
  }, []);

  // quick stats (ready for backend later)
  const [stats, setStats] = useState({
    pendingRequests: '—',
    todaysShifts: '—',
    onLeaveToday: '—',
  });

  useEffect(() => {
    let mounted = true;
    // جاهز للتوصيل الفعلي لاحقًا:
    // axios.get('/dashboard/statistics').then(({data})=> setStats({...}))
    (async () => {
      try {
        // Placeholder لطيف لمرحلة ما قبل الربط
        if (mounted) {
          setStats((s) => ({ ...s }));
        }
      } catch {
        // ignore; نتركها '—'
      }
    })();
    return () => {
      mounted = false;
    };
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
    {
      title: 'My Profile',
      description: 'See and update your personal information',
      icon: <AssignmentIndIcon />,
      path: '/profile',
    },
    {
      title: 'My Tasks',
      description: 'Track assigned tasks and status',
      icon: <ChecklistIcon />,
      path: '/tasks',
    },
  ];

  return (
    <PageContainer>
      {/* Welcome */}
      <WelcomeCard>
        <LogoContainer size="large">
          <img src={logo} alt="Dasho Logo" />
        </LogoContainer>

        <WelcomeContent>
          <Typography variant="h4" gutterBottom>
            {greeting}{user?.name ? `, ${user.name.split(' ')[0]}` : ''} 👋
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              flexWrap: 'wrap',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Avatar
              src={user?.photo_url || ''}
              alt={user?.name || 'User'}
              sx={{
                width: 120,
                height: 120,
                border: '3px solid #fff',
                boxShadow: 3,
              }}
              imgProps={{ referrerPolicy: 'no-referrer' }}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Typography variant="h5" fontWeight="bold">
                {user?.name || 'User'}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                {user?.job_title && (
                  <Chip label={user.job_title} color="default" size="small" sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.16)' }} />
                )}
                {user?.department && (
                  <Chip label={user.department} color="default" size="small" sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.16)' }} />
                )}
                {user?.role && (
                  <Chip label={String(user.role).toUpperCase()} size="small" sx={{ color: '#111', bgcolor: '#fff' }} />
                )}
              </Box>

              {quote && (
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.9)',
                    maxWidth: 720,
                    textAlign: 'center',
                  }}
                >
                  “{quote}”
                </Typography>
              )}
            </Box>
          </Box>
        </WelcomeContent>
      </WelcomeCard>

      {/* Quick stats (placeholders - hook to backend later) */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}>
          <StatCard>
            <Typography variant="overline" color="text.secondary">Pending requests</Typography>
            <Typography variant="h4">{stats.pendingRequests}</Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard>
            <Typography variant="overline" color="text.secondary">Today’s shifts</Typography>
            <Typography variant="h4">{stats.todaysShifts}</Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard>
            <Typography variant="overline" color="text.secondary">On leave today</Typography>
            <Typography variant="h4">{stats.onLeaveToday}</Typography>
          </StatCard>
        </Grid>
      </Grid>

      {/* Actions */}
      <ResponsiveGrid>
        {actions.map((action) => (
          <ActionCard
            key={action.title}
            role="button"
            tabIndex={0}
            aria-label={action.title}
            onClick={() => navigate(action.path)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') navigate(action.path);
            }}
          >
            <IconWrapper>{action.icon}</IconWrapper>
            <Typography variant="h6" gutterBottom>
              {action.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              {action.description}
            </Typography>
          </ActionCard>
        ))}
      </ResponsiveGrid>
    </PageContainer>
  );
}
