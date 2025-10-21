import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, SegmentedButtons, Snackbar, Button, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../context/ThemeContext';
import { GradientButton } from '../components/GradientButton';
import { Header } from '../components/Header';
import { spacing } from '../theme/spacing';
import { formatDate, formatTime } from '../utils/helpers';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import DocumentPicker from 'react-native-document-picker';
import { uploadAttachment } from '../utils/upload';

export const NewPermissionScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  
  const [reqType, setReqType] = useState('permission');
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
  const maxReason = 300;
  const [attachment, setAttachment] = useState(null); // { uri, name, type, url? }
  const [uploading, setUploading] = useState(false);

  const pickAttachment = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory',
      });
      if (res?.uri) {
        setAttachment({ uri: res.uri, name: res.name, type: res.type });
      }
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.warn('Attachment pick error', err);
      }
    }
  };

  const ensureUploaded = async () => {
    if (!attachment) return null;
    if (attachment.url) return attachment.url;
    setUploading(true);
    try {
      const url = await uploadAttachment(attachment);
      setAttachment((a) => ({ ...a, url }));
      return url;
    } finally {
      setUploading(false);
    }
  };

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

    // Backend expects: req_type, date_from, date_to, time_from, time_to, reason, (optional) attachment_url
    // Do NOT send user_id or req_datetime (server sets them)
    const attachment_url = await ensureUploaded();

    const payload = {
      req_type: reqType,
      date_from: formatDate(startDT, 'yyyy-MM-dd'),
      date_to: formatDate(endDT, 'yyyy-MM-dd'),
      time_from: formatTime(startTime, 'HH:mm'),
      time_to: formatTime(endTime, 'HH:mm'),
      reason: reason.trim(),
      attachment_url: attachment_url || null,
    };

    setLoading(true);
    try {
      await api.post('/requests', payload);
      setSnackbar({ visible: true, message: 'Request submitted successfully!', type: 'success' });

      // Reset form
      setReason('');
      setStartDate(new Date());
      setStartTime(new Date());
      setEndDate(new Date());
      setEndTime(new Date());

      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (error) {
      console.error('Submit error:', {
        status: error?.response?.status,
        data: error?.response?.data,
      });
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        (error?.response?.status === 400 ? 'Invalid fields. Please review your inputs.' : 'Failed to submit request');
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
        <Header title="New Request" subtitle="Submit a new permission or swap request" />

        <SegmentedButtons
          value={reqType}
          onValueChange={setReqType}
          buttons={[
            { value: 'permission', label: 'Permission' },
            { value: 'swap', label: 'Swap' },
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
          right={<TextInput.Affix text={`${reason.length}/${maxReason}`} />}
          maxLength={maxReason}
        />

        <View style={styles.input}>
          <Button
            mode="outlined"
            icon="paperclip"
            onPress={pickAttachment}
            loading={uploading}
            disabled={uploading}
          >
            {attachment?.name ? `Attached: ${attachment.name}` : 'Add attachment (image/PDF)'}
          </Button>
          {attachment?.url ? (
            <Text variant="labelSmall" style={{ marginTop: 6 }}>
              Uploaded
            </Text>
          ) : null}
        </View>

        <GradientButton
          onPress={handleSubmit}
          loading={loading}
          disabled={loading || !reason.trim()}
          style={styles.submitButton}
        >
          Submit Request
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
        style={snackbar.type === 'error' ? { backgroundColor: '#B00020' } : {}}
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
