import { styled } from '@mui/material/styles';
import { TextField, Select, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    backgroundColor: theme.palette.mode === 'light' 
      ? 'rgba(118, 118, 128, 0.12)' 
      : 'rgba(118, 118, 128, 0.24)',
    border: 'none',
    transition: theme.transitions.create(['background-color']),
    '&:hover': {
      backgroundColor: theme.palette.mode === 'light'
        ? 'rgba(118, 118, 128, 0.18)'
        : 'rgba(118, 118, 128, 0.32)',
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.mode === 'light'
        ? 'rgba(118, 118, 128, 0.12)'
        : 'rgba(118, 118, 128, 0.24)',
      boxShadow: `0 0 0 4px ${theme.palette.primary.main}40`,
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: 8,
  backgroundColor: theme.palette.mode === 'light'
    ? 'rgba(118, 118, 128, 0.12)'
    : 'rgba(118, 118, 128, 0.24)',
  border: 'none',
  transition: theme.transitions.create(['background-color']),
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light'
      ? 'rgba(118, 118, 128, 0.18)'
      : 'rgba(118, 118, 128, 0.32)',
  },
  '&.Mui-focused': {
    backgroundColor: theme.palette.mode === 'light'
      ? 'rgba(118, 118, 128, 0.12)'
      : 'rgba(118, 118, 128, 0.24)',
    boxShadow: `0 0 0 4px ${theme.palette.primary.main}40`,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

export const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    backgroundColor: theme.palette.mode === 'light'
      ? 'rgba(118, 118, 128, 0.12)'
      : 'rgba(118, 118, 128, 0.24)',
    border: 'none',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'light'
        ? 'rgba(118, 118, 128, 0.18)'
        : 'rgba(118, 118, 128, 0.32)',
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.mode === 'light'
        ? 'rgba(118, 118, 128, 0.12)'
        : 'rgba(118, 118, 128, 0.24)',
      boxShadow: `0 0 0 4px ${theme.palette.primary.main}40`,
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

export const StyledTimePicker = styled(TimePicker)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    backgroundColor: theme.palette.mode === 'light'
      ? 'rgba(118, 118, 128, 0.12)'
      : 'rgba(118, 118, 128, 0.24)',
    border: 'none',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'light'
        ? 'rgba(118, 118, 128, 0.18)'
        : 'rgba(118, 118, 128, 0.32)',
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.mode === 'light'
        ? 'rgba(118, 118, 128, 0.12)'
        : 'rgba(118, 118, 128, 0.24)',
      boxShadow: `0 0 0 4px ${theme.palette.primary.main}40`,
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

export const PrimaryButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  padding: '10px 20px',
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
    opacity: 0.9,
  },
  '&.MuiButton-contained': {
    backgroundColor: theme.palette.primary.main,
    color: '#FFFFFF',
  },
  '&.MuiButton-outlined': {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
})); 