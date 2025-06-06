import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const LogoContainer = styled(Box)(({ theme, size = 'medium' }) => {
  const sizes = {
    small: '32px',
    medium: '48px',
    large: '120px',
  };

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizes[size],
    height: sizes[size],
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'transform 0.2s ease-in-out',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
    '&:hover': {
      transform: 'scale(1.05)',
    },
  };
}); 