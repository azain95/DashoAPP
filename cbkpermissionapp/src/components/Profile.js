// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { Typography, Box, Avatar, Button, TextField, Snackbar, Alert, CircularProgress, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import Cookies from 'js-cookie';
import axios from '../utils/axiosInstance';
import useAuthGuard from '../hooks/useAuthGuard';
import { PageContainer, ContentCard, FormSection, ActionBar } from './styled/Layout';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function Profile() {
  useAuthGuard();
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [events, setEvents] = useState([]);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const currentUser = JSON.parse(Cookies.get('user'));
      if (!currentUser) {
        setLoading(false);
        return;
      }
      try {
        const userResponse = await axios.get(`/users/${currentUser.user_id}`);
        setUser(userResponse.data);
        setEditedUser(userResponse.data);

        const eventsResponse = await axios.get(`/events/user/${currentUser.user_id}`);
        setEvents(eventsResponse.data);

      } catch (error) {
        console.error('Error fetching user profile or events:', error);
        setNotification({
          open: true,
          message: 'Error loading profile data.',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name) => (date) => {
    setEditedUser({ ...editedUser, [name]: date });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleClearPhoto = () => {
    setEditedUser({ ...editedUser, photo_url: null });
    setSelectedFile(null); // Clear selected file as well
  };

  const handleSave = async () => {
    const token = Cookies.get('token');
    const formData = new FormData();

    // Append text fields
    formData.append('name', editedUser.name || '');
    formData.append('email', editedUser.email || '');
    formData.append('mobile', editedUser.mobile || '');
    
    // Add new fields to FormData
    formData.append('civil_id', editedUser.civil_id || '');
    formData.append('emergency_contact', editedUser.emergency_contact || '');
    formData.append('address', editedUser.address || '');
    formData.append('education', editedUser.education || '');
    formData.append('driving_license', editedUser.driving_license || ''); // Will send 'Yes' or 'No' string
    formData.append('contract_type', editedUser.contract_type || '');
    formData.append('job_title', editedUser.job_title || '');
    formData.append('grade', editedUser.grade || '');
    formData.append('status', editedUser.status || '');
    formData.append('nationality', editedUser.nationality || '');


    // Handle Date fields
    if (editedUser.dob) {
      formData.append('dob', format(new Date(editedUser.dob), 'yyyy-MM-dd'));
    } else {
      formData.append('dob', ''); // Send empty string if null
    }
    if (editedUser.joining_date) {
      formData.append('joining_date', format(new Date(editedUser.joining_date), 'yyyy-MM-dd'));
    } else {
      formData.append('joining_date', ''); // Send empty string if null
    }
    if (editedUser.graduation_year) {
        formData.append('graduation_year', editedUser.graduation_year); // Assuming year is just a number
    } else {
        formData.append('graduation_year', '');
    }


    // Append photo if selected
    if (selectedFile) {
        formData.append('photo', selectedFile);
    } else if (user.photo_url && editedUser.photo_url === null) {
        formData.append('clear_photo', 'true');
    } else if (user.photo_url) {
        formData.append('photo_url', user.photo_url);
    }


    try {
      await axios.put(`/users/${user.user_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setNotification({
        open: true,
        message: 'Profile updated successfully!',
        severity: 'success',
      });
      setIsEditing(false);
      const updatedUserResponse = await axios.get(`/users/${user.user_id}`);
      setUser(updatedUserResponse.data);
      Cookies.set('user', JSON.stringify(updatedUserResponse.data), { expires: 7 });
      setSelectedFile(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      setNotification({
        open: true,
        message: 'Error updating profile. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (loading) {
    return (
      <PageContainer>
        <ContentCard>
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
          <Typography align="center" mt={2}>Loading profile...</Typography>
        </ContentCard>
      </PageContainer>
    );
  }

  if (!user) {
    return (
      <PageContainer>
        <ContentCard>
          <Typography align="center">User data not found.</Typography>
        </ContentCard>
      </PageContainer>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <PageContainer>
        <ContentCard>
          <Typography variant="h4" gutterBottom>
            My Profile
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Avatar
              src={selectedFile ? URL.createObjectURL(selectedFile) : editedUser.photo_url || '/default-avatar.png'}
              alt={editedUser.name}
              sx={{ width: 120, height: 120, mb: 2, border: '3px solid', borderColor: 'primary.main' }}
            />
            {isEditing && (
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Button
                  component="label"
                  variant="outlined"
                  size="small"
                  startIcon={<CloudUploadIcon />}
                >
                  Change Photo
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
                {editedUser.photo_url && (
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={handleClearPhoto}
                  >
                    Clear Photo
                  </Button>
                )}
              </Box>
            )}
            <Typography variant="h5" sx={{ mt: 2 }}>{editedUser.name}</Typography>
            <Typography variant="body1" color="text.secondary">{editedUser.job_title || 'N/A'} - {editedUser.department || 'N/A'}</Typography>
          </Box>

          <FormSection>
            {/* Basic Info */}
            <TextField
              label="User ID"
              value={editedUser.user_id || ''}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Name"
              name="name"
              value={editedUser.name || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled={!isEditing}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={editedUser.email || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled={!isEditing}
            />
            <TextField
              label="Mobile"
              name="mobile"
              value={editedUser.mobile || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled={!isEditing}
            />

            {/* New Fields from DB Schema */}
            <TextField
              label="Civil ID"
              name="civil_id"
              value={editedUser.civil_id || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled={!isEditing}
            />
            <TextField
              label="Emergency Contact"
              name="emergency_contact"
              value={editedUser.emergency_contact || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled={!isEditing}
            />
            <TextField
              label="Address"
              name="address"
              value={editedUser.address || ''}
              onChange={handleChange}
              multiline
              rows={2}
              fullWidth
              margin="normal"
              disabled={!isEditing}
            />
            <DatePicker
              label="Date of Birth"
              name="dob"
              value={editedUser.dob ? new Date(editedUser.dob) : null}
              onChange={handleDateChange('dob')}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" disabled={!isEditing} />}
              disabled={!isEditing}
            />
            <DatePicker
              label="Joining Date"
              name="joining_date"
              value={editedUser.joining_date ? new Date(editedUser.joining_date) : null}
              onChange={handleDateChange('joining_date')}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" disabled={!isEditing} />}
              disabled={!isEditing}
            />
            
       {/* Driving License Dropdown */}
            <FormControl fullWidth margin="normal" disabled={!isEditing}>
              <InputLabel id="driving-license-label">Driving License</InputLabel>
             <Select
                labelId="driving-license-label"
                name="driving_license"
                value={editedUser.driving_license === true ? 'Yes' : editedUser.driving_license === false ? 'No' : ''} // <--- CORRECTED LINE
                label="Driving License"
                onChange={handleChange}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>

            {/* Education Dropdown */}
            <FormControl fullWidth margin="normal" disabled={!isEditing}>
              <InputLabel id="education-label">Education</InputLabel>
              <Select
                labelId="education-label"
                name="education"
                value={editedUser.education || ''}
                label="Education"
                onChange={handleChange}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="High School">High School</MenuItem>
                <MenuItem value="Diploma">Diploma</MenuItem>
                <MenuItem value="Bachelor's Degree">Bachelor's Degree</MenuItem>
                <MenuItem value="Master's Degree">Master's Degree</MenuItem>
                <MenuItem value="PhD">PhD</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Graduation Year"
              name="graduation_year"
              type="number"
              value={editedUser.graduation_year || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled={!isEditing}
            />
            
            <FormControl fullWidth margin="normal" disabled={!isEditing}>
              <InputLabel id="contract-type-label">Contract Type</InputLabel>
              <Select
                labelId="contract-type-label"
                name="contract_type"
                value={editedUser.contract_type || ''}
                label="Contract Type"
                onChange={handleChange}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="full-time">Full-time</MenuItem>
                <MenuItem value="part-time">Part-time</MenuItem>
                <MenuItem value="contractor">Contractor</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Job Title"
              name="job_title"
              value={editedUser.job_title || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled={!isEditing}
            />
            <TextField
              label="Grade"
              name="grade"
              value={editedUser.grade || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled={!isEditing}
            />
            <FormControl fullWidth margin="normal" disabled={!isEditing}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={editedUser.status || ''}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="on-leave">On Leave</MenuItem>
                <MenuItem value="terminated">Terminated</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Nationality"
              name="nationality"
              value={editedUser.nationality || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled={!isEditing}
            />
          </FormSection>

          <ActionBar sx={{ mt: 3 }}>
            {isEditing ? (
              <Button variant="contained" size="large" onClick={handleSave}>
                Save Changes
              </Button>
            ) : (
              <Button variant="contained" size="large" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </ActionBar>

          {events.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                My Events / Notes
              </Typography>
              {events.map((event) => (
                <ContentCard key={event.id} sx={{ mb: 2, p: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {event.event_type} - {format(new Date(event.event_date), 'MMM dd, yyyy')} {/* Corrected format here */}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.details}
                  </Typography>
                  {event.attachment_url && (
                    <Button
                      component="a"
                      href={event.attachment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      sx={{ mt: 1 }}
                    >
                      View Attachment
                    </Button>
                  )}
                </ContentCard>
              ))}
            </Box>
          )}
        </ContentCard>

        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={notification.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </PageContainer>
    </LocalizationProvider>
  );
}

export default Profile;