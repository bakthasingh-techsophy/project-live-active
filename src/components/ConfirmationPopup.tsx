import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface ConfirmationPopupProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  open,
  onClose,
  onConfirm,
  title,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles?.popupContainer}>
        <Typography variant="h6" sx={{ color: "primary." }}>
          {title}
        </Typography>
        <Box sx={styles?.buttonContainer}>
          <Button
            variant="contained"
            onClick={onConfirm}
            sx={{ ...styles?.confirmButton, size: "small" }}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ ...styles?.cancelButton, size: "small" }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const styles = {
  popupContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: 24,
    p: 2,
    borderRadius: 2,
    width: 400,
    height: 160,
    "@media(max-width:600px)": {
      width: 360,
      height: 140,
    },
    "@media(max-width:400px)": {
      width: 320,
      height: 140,
      p: 1.5,
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 2,
  },
  confirmButton: {
  },
  cancelButton: {
    background: "#fff !important",
    border: "1px solid rgba(18, 18, 18, 0.2) !important",
    color: "black !important",
  },
};

export default ConfirmationPopup;
