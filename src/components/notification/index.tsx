import { Snackbar, Alert } from "@mui/material";
import { NotificationProps } from "./type";

const Notification = ({
  className,
  isOpen,
  type,
  message,
  handleClose,
  ...rest
}: NotificationProps) => {
  return (
    <Snackbar
      className={className}
      open={isOpen}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      {...rest}
      onClose={handleClose}
    >
      <Alert
        severity={type ? type : "info"}
        variant="filled"
        onClose={handleClose}
        sx={{
          "@media (min-width: 2000px)": {
            fontSize: "calc(12px + 1.6rem)",
          },
          "@media (min-width: 1500px) and (max-width: 1999px)": {
            fontSize: "calc(12px + 0.8rem)",
          },
          "@media (min-width: 1000px) and (max-width: 1499px)": {
            fontSize: "calc(12px + 0.02rem)",
          },
          "@media (min-width: 600px) and (max-width: 999px)": {
            fontSize: "calc(12px + 0.002rem)",
          },
          "@media (max-width: 600px)": {
            fontSize: "calc(12px + 0.008rem)",
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "sans-serif",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
