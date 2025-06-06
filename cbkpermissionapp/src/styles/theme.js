import { createTheme } from '@mui/material/styles';

const sfPro = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007AFF', // iOS Blue
      light: '#5856D6', // iOS Purple
      dark: '#0056b3',
    },
    secondary: {
      main: '#34C759', // iOS Green
      light: '#5AD162',
      dark: '#248A3D',
    },
    error: {
      main: '#FF3B30', // iOS Red
    },
    warning: {
      main: '#FF9500', // iOS Orange
    },
    info: {
      main: '#5856D6', // iOS Purple
    },
    success: {
      main: '#34C759', // iOS Green
    },
    background: {
      default: '#F2F2F7', // iOS Light Gray
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#8E8E93',
    },
  },
  typography: {
    ...sfPro,
    h1: {
      ...sfPro,
      fontSize: '34px',
      fontWeight: 700,
      letterSpacing: '-0.022em',
    },
    h2: {
      ...sfPro,
      fontSize: '28px',
      fontWeight: 700,
      letterSpacing: '-0.021em',
    },
    h3: {
      ...sfPro,
      fontSize: '22px',
      fontWeight: 600,
      letterSpacing: '-0.020em',
    },
    h4: {
      ...sfPro,
      fontSize: '20px',
      fontWeight: 600,
      letterSpacing: '-0.019em',
    },
    body1: {
      ...sfPro,
      fontSize: '17px',
      letterSpacing: '-0.022em',
    },
    body2: {
      ...sfPro,
      fontSize: '15px',
      letterSpacing: '-0.021em',
    },
    button: {
      ...sfPro,
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            opacity: 0.9,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(20px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...lightTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#0A84FF', // iOS Dark Mode Blue
      light: '#5E5CE6', // iOS Dark Mode Purple
      dark: '#0056b3',
    },
    secondary: {
      main: '#30D158', // iOS Dark Mode Green
      light: '#5AD162',
      dark: '#248A3D',
    },
    error: {
      main: '#FF453A', // iOS Dark Mode Red
    },
    warning: {
      main: '#FF9F0A', // iOS Dark Mode Orange
    },
    info: {
      main: '#5E5CE6', // iOS Dark Mode Purple
    },
    success: {
      main: '#30D158', // iOS Dark Mode Green
    },
    background: {
      default: '#000000',
      paper: '#1C1C1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#98989F',
    },
  },
}); 