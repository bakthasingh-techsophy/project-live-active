import { SnackbarProps } from '@mui/material';

export interface NotificationProps extends SnackbarProps {
  className?: string;
  isOpen: boolean;
  type?: 'error' | 'info' | 'success' | 'warning';
  message?: string;
  handleClose?: () => void;
}
