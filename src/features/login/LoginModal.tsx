import { backgroundPic1 } from "@assets/index";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface AuthFormModalProps {
  open: boolean;
  setOpen: any;
}

const staticStyles = {
  container: {
    modalBox: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      height: "85%",
      bgcolor: "background.paper",
      boxShadow: 24,
      display: "flex",
      flexDirection: "row",
      borderRadius: 2,
      overflow: "auto",
    },
    closeIconContainer: {
      display: "flex",
      justifyContent: "end",
      alignItems: "center",
      position: "absolute",
      top: 16,
      right: 16,
    },
    leftImageBox: {
      height: "100%",
      backgroundImage: `url(${backgroundPic1})`,
      backgroundSize: "cover",
      backgroundPosition: "left",
    },
    toggleBox: {
      alignSelf: "flex-end",
      textTransform: "none",
      display: "flex",
      justifyContent: "end",
      alignItems: "center",
      gap: 1,
      pr: 4,
    },
  },
  typography: {
    toggleText: {
      display: "inline-block",
      fontSize: "0.9rem",
    },
    toggleLink: {
      display: "inline-block",
      fontSize: "0.9rem",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
};

const dynamicStyles = {
  container: {
    modalBox: (theme: any) => ({
      width: {
        lg: "60%",
        sm: "60%",
        md: "60%",
        xs: "95%",
      },
      borderColor: theme?.palette?.primary?.main,
    }),
    leftImageBox: {
      display: {
        lg: "block",
        md: "none",
        sm: "none",
        xs: "none",
      },
      width: "50%",
    },
    rightFormBox: {
      width: {
        lg: "50%",
        md: "100%",
        sm: "100%",
        xs: "100%",
      },
      padding: {
        lg: 4,
        md: 6,
        sm: 6,
      },
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "stretch",
    },
    toggleBox: {
      mb: {
        lg: 3,
        md: 3,
        sm: 3,
        xs: 3,
      },
    },
  },
};

const AuthFormModal = ({ open, setOpen }: AuthFormModalProps) => {
  const theme = useTheme();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleClose = () => setOpen(false);

  // Toggle between login and register form
  const toggleForm = () => {
    setIsRegistering((prev) => !prev);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={(e: any) => e?.preventDefault()}
        disableAutoFocus
      >
        <Box
          sx={[
            staticStyles?.container?.modalBox,
            dynamicStyles?.container?.modalBox(theme),
          ]}
        >
          <Box sx={staticStyles?.container?.closeIconContainer}>
            <IconButton onClick={handleClose} color="primary">
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={[
              staticStyles?.container?.leftImageBox,
              dynamicStyles?.container?.leftImageBox,
            ]}
          />
          <Box sx={dynamicStyles?.container?.rightFormBox}>
            {isRegistering ? <RegisterForm /> : <LoginForm />}
            <Box
              sx={[
                staticStyles?.container?.toggleBox,
                dynamicStyles?.container?.toggleBox,
              ]}
            >
              <Typography sx={staticStyles?.typography?.toggleText}>
                {isRegistering
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </Typography>
              <Typography
                onClick={toggleForm}
                color="primary"
                sx={staticStyles?.typography?.toggleLink}
              >
                {isRegistering ? "Login" : "Register"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AuthFormModal;
