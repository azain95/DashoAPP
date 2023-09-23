// App.js
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';


import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TextField, Typography } from '@mui/material';

import axios from 'axios';




function LeaveHistory() {
    const [leaves, setLeaves] = useState([]);
    const [filters, setFilters] = useState({
      type: "",
      status: "",
      startDate: "",
      endDate: "",
      reason: "",
      attachment: "",
    });
  
    const formatDate = (dateString) => {
      const [year, month, day] = dateString.split("T")[0].split("-");
      return `${day}/${month}/${year}`;
    };
  
    const handleSearchChange = (e, field) => {
      setFilters({ ...filters, [field]: e.target.value });
    };
  
    const filteredLeaves = leaves.filter((leave) => {
      if (
        filters.type &&
        !leave.req_type.toLowerCase().includes(filters.type.toLowerCase())
      )
        return false;
      if (
        filters.status &&
        leave.status.toLowerCase() !== filters.status.toLowerCase()
      )
        return false;
      if (
        filters.startDate &&
        formatDate(leave.date_from) !== filters.startDate
      )
        return false;
      if (
        filters.endDate &&
        formatDate(leave.date_to) !== filters.endDate
      )
        return false;
      if (
        filters.reason &&
        !leave.reason.toLowerCase().includes(filters.reason.toLowerCase())
      )
        return false;
      if (
        filters.attachment &&
        !leave.attachment.toLowerCase().includes(filters.attachment.toLowerCase())
      )
        return false;
      return true;
    });
  
    useEffect(() => {
      const fetchLeaveHistory = async () => {
        const userCookie = Cookies.get('user');
        const token = Cookies.get('token'); // Retrieve the token from cookies
  
        if (!userCookie || !token) {
          console.error('User not authenticated');
          setLeaves([]);
          return; // Exit if there's no user cookie or token
        }
    
        const user = JSON.parse(userCookie);
        if (!user || !user.user_id) {
          console.error('Invalid user data');
          setLeaves([]);
          return; // Exit if the user object or user_id is missing
        }
  
        try {
          const response = await axios.get(`https://api.dashoprojects.com/requests/user/${user.user_id}`, {
            headers: {
              Authorization: `Bearer ${token}` // Including the token in the Authorization header
            }
          });
  
          if (response.data && response.data.length > 0) {
            // Exclude leaves of type "permission" and "swap"
            const filteredLeaves = response.data.filter(
              (leave) => leave.req_type.toLowerCase() !== "permission" && leave.req_type.toLowerCase() !== "swap"
            );
  
  
              // Sort by request date in descending order (newest to oldest)
              filteredLeaves.sort((a, b) => new Date(b.req_datetime) - new Date(a.req_datetime));
  
            
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
        <Typography variant="h4" gutterBottom>
          Leave History
        </Typography>
        <div className="filter-container">
          <TextField
            label="Type"
            variant="outlined"
            size="small"
            onChange={(e) => handleSearchChange(e, "type")}
          />
          <TextField
            label="Status"
            variant="outlined"
            size="small"
            onChange={(e) => handleSearchChange(e, "status")}
          />
          <TextField
            label="Start Date (DD/MM/YYYY)"
            variant="outlined"
            size="small"
            onChange={(e) => handleSearchChange(e, "startDate")}
          />
          <TextField
            label="End Date (DD/MM/YYYY)"
            variant="outlined"
            size="small"
            onChange={(e) => handleSearchChange(e, "endDate")}
          />
          <TextField
            label="Reason"
            variant="outlined"
            size="small"
            onChange={(e) => handleSearchChange(e, "reason")}
          />
          <TextField
            label="Attachment"
            variant="outlined"
            size="small"
            onChange={(e) => handleSearchChange(e, "attachment")}
          />
        </div>
        <Paper style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Reason</TableCell>
                {/* <TableCell>Attachment</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLeaves.length > 0 ? (
                filteredLeaves.map((leave) => (
                  <TableRow key={leave.id}>
                    <TableCell>{leave.req_type}</TableCell>
                    <TableCell>{getStatusLabel(leave.status)}</TableCell>
                    <TableCell>{formatDate(leave.date_from)}</TableCell>
                    <TableCell>{formatDate(leave.date_to)}</TableCell>
                    <TableCell>{leave.reason}</TableCell>
                    {/* <TableCell>{leave.attachment}</TableCell> */}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    No leaves found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }


  export default LeaveHistory