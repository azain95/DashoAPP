import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PageContainer, ContentCard } from './styled/Layout';
import Cookies from 'js-cookie';
import axios from 'axios';
import { styled } from '@mui/material/styles';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px !important',
  marginBottom: theme.spacing(1.5),
  '&:before': {
    display: 'none',
  },
  '& .MuiAccordionSummary-root': {
    borderRadius: '12px',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' 
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(0, 0, 0, 0.02)',
    },
  },
}));

const DetailRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return theme.palette.success.main;
      case 'rejected':
        return theme.palette.error.main;
      default:
        return theme.palette.warning.main;
    }
  };

  return {
    backgroundColor: `${getStatusColor(status)}15`,
    color: getStatusColor(status),
    fontWeight: 600,
    '& .MuiChip-label': {
      padding: '0 12px',
    },
  };
});

function PermissionHistory() {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const token = Cookies.get('token');
        const user = JSON.parse(Cookies.get('user'));
        
        if (!user || !token) {
          console.error('User not authenticated');
          return;
        }

        const response = await axios.get(`https://api.dashoprojects.com/requests/user/${user.user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const filteredPermissions = response.data.filter(
          req => ['permission', 'swap'].includes(req.req_type.toLowerCase())
        );

        filteredPermissions.sort((a, b) => 
          new Date(b.req_datetime) - new Date(a.req_datetime)
        );

        setPermissions(filteredPermissions);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const MobileView = () => (
    <Box sx={{ mt: 2 }}>
      {permissions.length > 0 ? (
        permissions.map((permission) => (
          <StyledAccordion key={permission.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {permission.req_type}
                  </Typography>
                  <StatusChip
                    label={permission.status}
                    status={permission.status}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(permission.req_datetime)}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <DetailRow>
                <Typography variant="body2" color="text.secondary">From</Typography>
                <Typography variant="body2">
                  {formatDate(permission.date_from)} {permission.time_from}
                </Typography>
              </DetailRow>
              <DetailRow>
                <Typography variant="body2" color="text.secondary">To</Typography>
                <Typography variant="body2">
                  {formatDate(permission.date_to)} {permission.time_to}
                </Typography>
              </DetailRow>
              <DetailRow>
                <Typography variant="body2" color="text.secondary">Reason</Typography>
                <Typography variant="body2" sx={{ maxWidth: '70%', textAlign: 'right' }}>
                  {permission.reason}
                </Typography>
              </DetailRow>
            </AccordionDetails>
          </StyledAccordion>
        ))
      ) : (
        <Typography color="text.secondary" align="center">
          No permission requests found
        </Typography>
      )}
    </Box>
  );

  const DesktopView = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date Requested</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Reason</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {permissions.length > 0 ? (
            permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell>
                  {formatDate(permission.req_datetime)}
                </TableCell>
                <TableCell>{permission.req_type}</TableCell>
                <TableCell>
                  {`${formatDate(permission.date_from)} ${permission.time_from}`}
                </TableCell>
                <TableCell>
                  {`${formatDate(permission.date_to)} ${permission.time_to}`}
                </TableCell>
                <TableCell>
                  <StatusChip
                    label={permission.status}
                    status={permission.status}
                    size="small"
                  />
                </TableCell>
                <TableCell>{permission.reason}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography color="text.secondary">
                  No permission requests found
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <PageContainer>
      <ContentCard>
        <Typography variant="h4" gutterBottom>
          Permission History
        </Typography>
        {isMobile ? <MobileView /> : <DesktopView />}
      </ContentCard>
    </PageContainer>
  );
}

export default PermissionHistory;  