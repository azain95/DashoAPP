// App.js
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
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

function LeaveHistory() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchLeaves = async () => {
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
        
        // Filter only leave requests (excluding permissions and swaps)
        const filteredLeaves = response.data.filter(
          req => !['permission', 'swap'].includes(req.req_type.toLowerCase())
        );

        // Sort by date (newest first)
        filteredLeaves.sort((a, b) => 
          new Date(b.req_datetime) - new Date(a.req_datetime)
        );

        setLeaves(filteredLeaves);
      } catch (error) {
        console.error('Error fetching leaves:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
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
      {leaves.length > 0 ? (
        leaves.map((leave) => (
          <StyledAccordion key={leave.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {leave.req_type}
                  </Typography>
                  <StatusChip
                    label={leave.status}
                    status={leave.status}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(leave.req_datetime)}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <DetailRow>
                <Typography variant="body2" color="text.secondary">From</Typography>
                <Typography variant="body2">
                  {formatDate(leave.date_from)} {leave.time_from}
                </Typography>
              </DetailRow>
              <DetailRow>
                <Typography variant="body2" color="text.secondary">To</Typography>
                <Typography variant="body2">
                  {formatDate(leave.date_to)} {leave.time_to}
                </Typography>
              </DetailRow>
              <DetailRow>
                <Typography variant="body2" color="text.secondary">Reason</Typography>
                <Typography variant="body2" sx={{ maxWidth: '70%', textAlign: 'right' }}>
                  {leave.reason}
                </Typography>
              </DetailRow>
            </AccordionDetails>
          </StyledAccordion>
        ))
      ) : (
        <Typography color="text.secondary" align="center">
          No leave requests found
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
          {leaves.length > 0 ? (
            leaves.map((leave) => (
              <TableRow key={leave.id}>
                <TableCell>
                  {formatDate(leave.req_datetime)}
                </TableCell>
                <TableCell>{leave.req_type}</TableCell>
                <TableCell>
                  {`${formatDate(leave.date_from)} ${leave.time_from}`}
                </TableCell>
                <TableCell>
                  {`${formatDate(leave.date_to)} ${leave.time_to}`}
                </TableCell>
                <TableCell>
                  <StatusChip
                    label={leave.status}
                    status={leave.status}
                    size="small"
                  />
                </TableCell>
                <TableCell>{leave.reason}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography color="text.secondary">
                  No leave requests found
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
          Leave History
        </Typography>
        {isMobile ? <MobileView /> : <DesktopView />}
      </ContentCard>
    </PageContainer>
  );
}

export default LeaveHistory;