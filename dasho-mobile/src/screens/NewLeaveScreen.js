import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, SegmentedButtons, Snackbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../context/ThemeContext';
import { GradientButton } from '../components/GradientButton';
import { Header } from '../components/Header';
import { spacing } from '../theme/spacing';
import { formatDate, formatTime } from '../utils/helpers';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

export const NewLeaveScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  
  const [leaveType, setLeaveType] = useState('annual');
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [showStartDate, setShowStartDate] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [snackbar, setSnackbar] = useState({ visible: false, message: '', type: 'success' });

  const handleSubmit = async () => {
    if (!reason.trim()) {
      setSnackbar({ visible: true, message: 'Please enter a reason', type: 'error' });
      return;
    }

    const startDT = new Date(startDate);
    startDT.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0);

    const endDT = new Date(endDate);
    endDT.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);

    if (endDT <= startDT) {
      setSnackbar({ visible: true, message: 'End time must be after start time', type: 'error' });
      return;
    }

    const payload = {
      req_datetime: new Date().toISOString(),
      req_type: leaveType,
      date_from: formatDate(startDT),
      date_to: formatDate(endDT),
      time_from: formatTime(startTime),
      time_to: formatTime(endTime),
      user_id: user?.user_id,
      reason: reason.trim(),
      status: 'pending',
    };

    setLoading(true);
    try {
      await api.post('/requests', payload);
      setSnackbar({ visible: true, message: 'Leave request submitted successfully!', type: 'success' });
      
      setReason('');
      setStartDate(new Date());
      setStartTime(new Date());
      setEndDate(new Date());
      setEndTime(new Date());
      
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (error) {
      console.error('Submit error:', error);
      const message = error?.response?.data?.message || 'Failed to submit leave request';
      setSnackbar({ visible: true, message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Header title="New Leave" subtitle="Submit a new leave request" />

        <SegmentedButtons
          value={leaveType}
          onValueChange={setLeaveType}
          buttons={[
            { value: 'annual', label: 'Annual' },
            { value: 'sick', label: 'Sick' },
            { value: 'emergency', label: 'Emergency' },
          ]}
          style={styles.segment}
        />

        <View style={styles.dateTimeSection}>
          <TextInput
            mode="outlined"
            label="Start Date"
            value={formatDate(startDate, 'MMM dd, yyyy')}
            editable={false}
            right={<TextInput.Icon icon="calendar" onPress={() => setShowStartDate(true)} />}
            style={styles.input}
          />

          <TextInput
            mode="outlined"
            label="Start Time"
            value={formatTime(startTime, 'hh:mm a')}
            editable={false}
            right={<TextInput.Icon icon="clock" onPress={() => setShowStartTime(true)} />}
            style={styles.input}
          />

          <TextInput
            mode="outlined"
            label="End Date"
            value={formatDate(endDate, 'MMM dd, yyyy')}
            editable={false}
            right={<TextInput.Icon icon="calendar" onPress={() => setShowEndDate(true)} />}
            style={styles.input}
          />

          <TextInput
            mode="outlined"
            label="End Time"
            value={formatTime(endTime, 'hh:mm a')}
            editable={false}
            right={<TextInput.Icon icon="clock" onPress={() => setShowEndTime(true)} />}
            style={styles.input}
          />
        </View>

        <TextInput
          mode="outlined"
          label="Reason"
          value={reason}
          onChangeText={setReason}
          multiline
          numberOfLines={4}
          style={styles.textArea}
        />

        <GradientButton
          onPress={handleSubmit}
          loading={loading}
          style={styles.submitButton}
        >
          Submit Leave Request
        </GradientButton>
      </ScrollView>

      {showStartDate && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowStartDate(false);
            if (date) setStartDate(date);
          }}
        />
      )}

      {showStartTime && (
        <DateTimePicker
          value={startTime}
          mode="time"
          display="default"
          onChange={(event, date) => {
            setShowStartTime(false);
            if (date) setStartTime(date);
          }}
        />
      )}

      {showEndDate && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowEndDate(false);
            if (date) setEndDate(date);
          }}
        />
      )}

      {showEndTime && (
        <DateTimePicker
          value={endTime}
          mode="time"
          display="default"
          onChange={(event, date) => {
            setShowEndTime(false);
            if (date) setEndTime(date);
          }}
        />
      )}

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
        duration={3000}
        action={{
          label: 'Dismiss',
          onPress: () => setSnackbar({ ...snackbar, visible: false }),
        }}
      >
        {snackbar.message}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  segment: {
    marginBottom: spacing.lg,
  },
  dateTimeSection: {
    marginBottom: spacing.md,
  },
  input: {
    marginBottom: spacing.md,
  },
  textArea: {
    marginBottom: spacing.lg,
  },
  submitButton: {
    marginTop: spacing.md,
  },
});
